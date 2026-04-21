/**
 * Forward Chaining Inference Engine
 *
 * How it works:
 *
 * 1. User input (facts) is loaded into Working Memory.
 *
 * 2. PHASE 1 — Aspect Evaluation
 *    The engine iterates through aspect rules (Sets 2-5).
 *    For each rule, it checks whether ALL conditions are
 *    satisfied by the current working memory.
 *    When a rule fires, its result is merged into working
 *    memory, producing intermediate aspect values.
 *
 * 3. PHASE 2 — Decision Evaluation
 *    The engine iterates through decision rules (Set 1).
 *    These rules use the intermediate aspect values from
 *    Phase 1. The FIRST matching rule determines the
 *    final feasibility decision.
 *
 * 4. Every fired rule is recorded in the inference log
 *    for transparency and debugging.
 */

import { aspectRules, decisionRules } from "./rules.js";

export class ForwardChainingEngine {
  constructor() {
    /** @type {Object<string, string>} fact store */
    this.workingMemory = {};

    /** @type {Array<Object>} ordered log of fired rules */
    this.log = [];
  }

  // ─── Public API ──────────────────────────────────────────

  /**
   * Load user input as initial facts into working memory.
   * Clears any previous state.
   * @param {Object<string, string>} facts
   */
  setFacts(facts) {
    this.workingMemory = { ...facts };
    this.log = [];
  }

  /**
   * Run full forward chaining evaluation.
   * @returns {{ aspek: Object, kelayakan_ide: string, log: Array }}
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
   * @returns {Object<string, string>}
   */
  getWorkingMemory() {
    return { ...this.workingMemory };
  }

  // ─── Internal helpers ────────────────────────────────────

  /**
   * Check if all conditions of a rule match working memory.
   * A rule with fewer conditions acts as a wildcard for unspecified attributes.
   * @param {Object<string, string>} conditions
   * @returns {boolean}
   */
  _matchConditions(conditions) {
    return Object.entries(conditions).every(
      ([key, value]) => this.workingMemory[key] === value
    );
  }

  /**
   * Try to fire a single rule. If conditions match, merge result
   * into working memory and log the event.
   * @param {Object} rule
   * @returns {boolean} whether the rule fired
   */
  _tryFireRule(rule) {
    const matched = this._matchConditions(rule.conditions);

    if (matched) {
      Object.assign(this.workingMemory, rule.result);

      this.log.push({
        type: "rule_fired",
        ruleId: rule.id,
        set: rule.set,
        description: rule.description,
        conditions: { ...rule.conditions },
        result: { ...rule.result },
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
   * @returns {{ aspek: Object, kelayakan_ide: string, log: Array }}
   */
  _buildResult() {
    return {
      aspek: {
        ide_masalah: this.workingMemory.ide_masalah || null,
        pasar_kompetitor: this.workingMemory.pasar_kompetitor || null,
        tim_sumber_daya: this.workingMemory.tim_sumber_daya || null,
        model_bisnis: this.workingMemory.model_bisnis || null,
      },
      kelayakan_ide: this.workingMemory.kelayakan_ide || "Tidak Diketahui",
      log: this.getLog(),
    };
  }
}
