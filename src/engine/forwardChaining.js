/**
 * Forward Chaining Inference Engine (with Certainty Factor)
 *
 * How it works:
 *
 * 1. User input (facts) is loaded into Working Memory.
 *    Each fact is stored as { value, cf } where cf is looked up
 *    from the expert-defined factCF table.
 *
 * 2. PHASE 1 — Aspect Evaluation
 *    The engine iterates through aspect rules (Sets 2-5).
 *    For each rule, it checks whether ALL conditions are
 *    satisfied by the current working memory.
 *    When a rule fires, its result is merged into working
 *    memory, producing intermediate aspect values with CF:
 *      CF(conclusion) = min(CF of all premises) × CF(RULE)
 *
 * 3. PHASE 2 — Decision Evaluation
 *    The engine iterates through decision rules (Set 1).
 *    These rules use the intermediate aspect values from
 *    Phase 1. The FIRST matching rule determines the
 *    final feasibility decision, with its own CF.
 *
 * 4. If multiple rules produce the same conclusion, their CFs
 *    are combined using CFCOMBINE:
 *      Both > 0:  CF1 + CF2 × (1 - CF1)
 *      One  < 0:  (CF1 + CF2) / (1 - min(|CF1|, |CF2|))
 *      Both < 0:  CF1 + CF2 × (1 + CF1)
 *
 * 5. Every fired rule is recorded in the inference log
 *    for transparency and debugging.
 */

import { aspectRules, decisionRules } from "./rules.js";
import { factCF } from "../data/cfValues.js";

export class ForwardChainingEngine {
  constructor() {
    /** @type {Object<string, {value: string, cf: number}>} fact store */
    this.workingMemory = {};

    /** @type {Array<Object>} ordered log of fired rules */
    this.log = [];
  }

  // ─── Public API ──────────────────────────────────────────

  /**
   * Load user input as initial facts into working memory.
   * Clears any previous state. Looks up CF from factCF table.
   * @param {Object<string, string>} facts  e.g. { kejelasan_masalah: "jelas", ... }
   */
  setFacts(facts) {
    this.workingMemory = {};
    this.log = [];

    for (const [key, value] of Object.entries(facts)) {
      const cfValue = factCF[key]?.[value] ?? 1.0;
      this.workingMemory[key] = { value, cf: cfValue };
    }
  }

  /**
   * Run full forward chaining evaluation.
   * @returns {{ aspek: Object, kelayakan_ide: string, cf_kelayakan: number, log: Array }}
   */
  evaluate() {
    this._logPhase("FASE 1: Evaluasi Aspek (Atribut → Aspek)");

    // Phase 1 — evaluate aspect rules (Sets 2–5)
    for (const rule of aspectRules) {
      this._tryFireRule(rule);
    }

    this._logPhase("FASE 2: Evaluasi Keputusan Akhir (Aspek → Keputusan)");

    // Phase 2 — evaluate decision rules (Set 1)
    // Stop at the first match (rules are mutually exclusive by design)
    for (const rule of decisionRules) {
      const fired = this._tryFireRule(rule);
      if (fired) break;
    }

    return this._buildResult();
  }

  /**
   * Returns the complete inference log.
   * @returns {Array<Object>}
   */
  getLog() {
    return [...this.log];
  }

  /**
   * Returns a snapshot of the current working memory.
   * @returns {Object<string, {value: string, cf: number}>}
   */
  getWorkingMemory() {
    return { ...this.workingMemory };
  }

  // ─── Internal helpers ────────────────────────────────────

  /**
   * Check if all conditions of a rule match working memory.
   * Working memory now stores { value, cf }, so compare against .value.
   * @param {Object<string, string>} conditions
   * @returns {boolean}
   */
  _matchConditions(conditions) {
    return Object.entries(conditions).every(
      ([key, value]) => this.workingMemory[key]?.value === value
    );
  }

  /**
   * Combine two CF values using the standard CFCOMBINE formula.
   * @param {number} cf1
   * @param {number} cf2
   * @returns {number}
   */
  _cfCombine(cf1, cf2) {
    if (cf1 >= 0 && cf2 >= 0) {
      return cf1 + cf2 * (1 - cf1);
    } else if (cf1 < 0 && cf2 < 0) {
      return cf1 + cf2 * (1 + cf1);
    } else {
      return (cf1 + cf2) / (1 - Math.min(Math.abs(cf1), Math.abs(cf2)));
    }
  }

  /**
   * Try to fire a single rule. If conditions match, compute CF,
   * merge result into working memory (with CFCOMBINE if needed),
   * and log the event.
   * @param {Object} rule
   * @returns {boolean} whether the rule fired
   */
  _tryFireRule(rule) {
    const matched = this._matchConditions(rule.conditions);

    if (matched) {
      // Collect CF values of all premises involved in this rule
      const premiseCFs = Object.keys(rule.conditions).map(
        (key) => this.workingMemory[key].cf
      );

      // CF(conclusion) = min(CF premises) × CF(rule)
      const cfPremises = Math.min(...premiseCFs);
      const cfResult = cfPremises * rule.cf;

      // Merge result into working memory
      for (const [key, value] of Object.entries(rule.result)) {
        if (this.workingMemory[key] !== undefined) {
          // Combine with existing CF if conclusion already exists
          const existingCF = this.workingMemory[key].cf;
          const combinedCF = this._cfCombine(existingCF, cfResult);
          this.workingMemory[key] = { value, cf: combinedCF };
        } else {
          this.workingMemory[key] = { value, cf: cfResult };
        }
      }

      this.log.push({
        type: "rule_fired",
        ruleId: rule.id,
        set: rule.set,
        description: rule.description,
        conditions: { ...rule.conditions },
        result: { ...rule.result },
        cfRule: rule.cf,
        cfPremises,
        cfPremiseDetails: premiseCFs,
        cfResult,
      });
    }

    return matched;
  }

  /**
   * Add a phase separator to the log for readability.
   * @param {string} label
   */
  _logPhase(label) {
    this.log.push({
      type: "phase",
      label,
    });
  }

  /**
   * Assemble the final result object.
   * @returns {{ aspek: Object, kelayakan_ide: string, cf_kelayakan: number, log: Array }}
   */
  _buildResult() {
    const getAspek = (key) => {
      const entry = this.workingMemory[key];
      if (!entry) return { value: null, cf: 0 };
      return { value: entry.value, cf: entry.cf };
    };

    return {
      aspek: {
        ide_masalah: getAspek("ide_masalah"),
        pasar_kompetitor: getAspek("pasar_kompetitor"),
        tim_sumber_daya: getAspek("tim_sumber_daya"),
        model_bisnis: getAspek("model_bisnis"),
      },
      kelayakan_ide:
        this.workingMemory.kelayakan_ide?.value || "Tidak Diketahui",
      cf_kelayakan: this.workingMemory.kelayakan_ide?.cf || 0,
      log: this.getLog(),
    };
  }
}
