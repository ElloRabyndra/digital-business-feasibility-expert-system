/**
 * CF Fakta — Certainty Factor values assigned by the expert
 * for each attribute-value pair (user's binary choices).
 *
 * Rationale:
 * - Negative values (tidak_jelas, kurang, tinggi, tidak_ada, tidak_cukup, tidak_sesuai)
 *   are given higher CF because users tend to be more certain when recognizing deficiencies.
 * - Positive values are slightly lower due to optimism bias.
 */

export const factCF = {
  kejelasan_masalah: { jelas: 0.8, tidak_jelas: 0.9 },
  kesesuaian_solusi: { sesuai: 0.8, tidak_sesuai: 0.9 },
  nilai_unik: { ada: 0.7, tidak_ada: 0.9 },
  target_pasar: { jelas: 0.8, tidak_jelas: 0.9 },
  tingkat_kompetitor: { rendah: 0.7, tinggi: 0.9 },
  skill_tim: { cukup: 0.8, kurang: 0.9 },
  pengalaman_tim: { ada: 0.7, tidak_ada: 0.9 },
  modal_awal: { cukup: 0.7, tidak_cukup: 0.9 },
  kejelasan_monetisasi: { jelas: 0.8, tidak_jelas: 0.9 },
  keberlanjutan: { jelas: 0.7, tidak_jelas: 0.9 },
};
