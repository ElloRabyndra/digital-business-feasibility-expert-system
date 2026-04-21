/**
 * Rule Definitions — Sistem Pakar Kelayakan Ide Bisnis Digital
 *
 * Rules are organized by sets matching the dependency diagram:
 *   Set 2 (R13-R16) : Atribut → Aspek Ide & Masalah
 *   Set 3 (R17-R19) : Atribut → Aspek Pasar & Kompetitor
 *   Set 4 (R20-R23) : Atribut → Aspek Tim & Sumber Daya
 *   Set 5 (R24-R26) : Atribut → Aspek Model Bisnis
 *   Set 1 (R1-R12)  : Aspek  → Keputusan Akhir
 *
 * Structure per rule:
 *   id          – unique identifier
 *   set         – grouping label for logging
 *   description – human-readable explanation (Bahasa Indonesia)
 *   conditions  – object whose keys must ALL match working memory
 *   result      – object to merge into working memory when rule fires
 */

//  Set 2: Aspek Ide & Masalah 
const ideRules = [
  {
    id: "R13",
    set: "Ide & Masalah",
    description:
      "Masalah jelas, solusi sesuai, dan memiliki nilai unik → Ide & Masalah Baik",
    conditions: {
      kejelasan_masalah: "jelas",
      kesesuaian_solusi: "sesuai",
      nilai_unik: "ada",
    },
    result: { ide_masalah: "baik" },
  },
  {
    id: "R14",
    set: "Ide & Masalah",
    description:
      "Masalah jelas, solusi sesuai, tetapi tidak ada nilai unik → Ide & Masalah Kurang",
    conditions: {
      kejelasan_masalah: "jelas",
      kesesuaian_solusi: "sesuai",
      nilai_unik: "tidak_ada",
    },
    result: { ide_masalah: "kurang" },
  },
  {
    id: "R15",
    set: "Ide & Masalah",
    description:
      "Masalah jelas tetapi solusi tidak sesuai → Ide & Masalah Kurang",
    conditions: {
      kejelasan_masalah: "jelas",
      kesesuaian_solusi: "tidak_sesuai",
    },
    result: { ide_masalah: "kurang" },
  },
  {
    id: "R16",
    set: "Ide & Masalah",
    description: "Masalah tidak jelas → Ide & Masalah Kurang",
    conditions: {
      kejelasan_masalah: "tidak_jelas",
    },
    result: { ide_masalah: "kurang" },
  },
];

//  Set 3: Aspek Pasar & Kompetitor 
const pasarRules = [
  {
    id: "R17",
    set: "Pasar & Kompetitor",
    description:
      "Target pasar jelas tetapi kompetitor tinggi → Pasar & Kompetitor Kurang",
    conditions: {
      target_pasar: "jelas",
      tingkat_kompetitor: "tinggi",
    },
    result: { pasar_kompetitor: "kurang" },
  },
  {
    id: "R18",
    set: "Pasar & Kompetitor",
    description:
      "Target pasar jelas dan kompetitor rendah → Pasar & Kompetitor Baik",
    conditions: {
      target_pasar: "jelas",
      tingkat_kompetitor: "rendah",
    },
    result: { pasar_kompetitor: "baik" },
  },
  {
    id: "R19",
    set: "Pasar & Kompetitor",
    description: "Target pasar tidak jelas → Pasar & Kompetitor Kurang",
    conditions: {
      target_pasar: "tidak_jelas",
    },
    result: { pasar_kompetitor: "kurang" },
  },
];

//  Set 4: Aspek Tim & Sumber Daya 
const timRules = [
  {
    id: "R20",
    set: "Tim & Sumber Daya",
    description:
      "Skill tim cukup dan memiliki pengalaman → Tim & Sumber Daya Baik",
    conditions: {
      skill_tim: "cukup",
      pengalaman_tim: "ada",
    },
    result: { tim_sumber_daya: "baik" },
  },
  {
    id: "R21",
    set: "Tim & Sumber Daya",
    description:
      "Skill tim cukup, tanpa pengalaman, tetapi modal cukup → Tim & Sumber Daya Baik",
    conditions: {
      skill_tim: "cukup",
      pengalaman_tim: "tidak_ada",
      modal_awal: "cukup",
    },
    result: { tim_sumber_daya: "baik" },
  },
  {
    id: "R22",
    set: "Tim & Sumber Daya",
    description:
      "Skill tim cukup, tanpa pengalaman, dan modal tidak cukup → Tim & Sumber Daya Kurang",
    conditions: {
      skill_tim: "cukup",
      pengalaman_tim: "tidak_ada",
      modal_awal: "tidak_cukup",
    },
    result: { tim_sumber_daya: "kurang" },
  },
  {
    id: "R23",
    set: "Tim & Sumber Daya",
    description: "Skill tim kurang → Tim & Sumber Daya Kurang",
    conditions: {
      skill_tim: "kurang",
    },
    result: { tim_sumber_daya: "kurang" },
  },
];

//  Set 5: Aspek Model Bisnis 
const modelBisnisRules = [
  {
    id: "R24",
    set: "Model Bisnis",
    description:
      "Monetisasi jelas dan model bisnis berkelanjutan → Model Bisnis Baik",
    conditions: {
      kejelasan_monetisasi: "jelas",
      keberlanjutan: "jelas",
    },
    result: { model_bisnis: "baik" },
  },
  {
    id: "R25",
    set: "Model Bisnis",
    description:
      "Monetisasi jelas tetapi model bisnis tidak berkelanjutan → Model Bisnis Kurang",
    conditions: {
      kejelasan_monetisasi: "jelas",
      keberlanjutan: "tidak_jelas",
    },
    result: { model_bisnis: "kurang" },
  },
  {
    id: "R26",
    set: "Model Bisnis",
    description: "Monetisasi tidak jelas → Model Bisnis Kurang",
    conditions: {
      kejelasan_monetisasi: "tidak_jelas",
    },
    result: { model_bisnis: "kurang" },
  },
];

//  Aspect rules: evaluated FIRST (data → intermediate) 
export const aspectRules = [
  ...ideRules,
  ...pasarRules,
  ...timRules,
  ...modelBisnisRules,
];

//  Set 1: Keputusan Akhir (evaluated SECOND) 
export const decisionRules = [
  {
    id: "R1",
    set: "Keputusan Akhir",
    description: "Semua aspek baik → Layak",
    conditions: {
      ide_masalah: "baik",
      pasar_kompetitor: "baik",
      tim_sumber_daya: "baik",
      model_bisnis: "baik",
    },
    result: { kelayakan_ide: "Layak" },
  },
  {
    id: "R2",
    set: "Keputusan Akhir",
    description:
      "Ide baik, pasar baik, tim baik, tetapi model bisnis kurang → Cukup Layak",
    conditions: {
      ide_masalah: "baik",
      pasar_kompetitor: "baik",
      tim_sumber_daya: "baik",
      model_bisnis: "kurang",
    },
    result: { kelayakan_ide: "Cukup Layak" },
  },
  {
    id: "R3",
    set: "Keputusan Akhir",
    description:
      "Ide baik, pasar baik, model bisnis baik, tetapi tim kurang → Cukup Layak",
    conditions: {
      ide_masalah: "baik",
      pasar_kompetitor: "baik",
      tim_sumber_daya: "kurang",
      model_bisnis: "baik",
    },
    result: { kelayakan_ide: "Cukup Layak" },
  },
  {
    id: "R4",
    set: "Keputusan Akhir",
    description:
      "Ide baik, tim baik, model bisnis baik, tetapi pasar kurang → Cukup Layak",
    conditions: {
      ide_masalah: "baik",
      pasar_kompetitor: "kurang",
      tim_sumber_daya: "baik",
      model_bisnis: "baik",
    },
    result: { kelayakan_ide: "Cukup Layak" },
  },
  {
    id: "R5",
    set: "Keputusan Akhir",
    description:
      "Pasar baik, tim baik, model bisnis baik, tetapi ide kurang → Cukup Layak",
    conditions: {
      ide_masalah: "kurang",
      pasar_kompetitor: "baik",
      tim_sumber_daya: "baik",
      model_bisnis: "baik",
    },
    result: { kelayakan_ide: "Cukup Layak" },
  },
  {
    id: "R6",
    set: "Keputusan Akhir",
    description:
      "Ide baik, tetapi pasar, tim, dan model bisnis semua kurang → Cukup Layak",
    conditions: {
      ide_masalah: "baik",
      pasar_kompetitor: "kurang",
      tim_sumber_daya: "kurang",
      model_bisnis: "kurang",
    },
    result: { kelayakan_ide: "Cukup Layak" },
  },
  {
    id: "R7",
    set: "Keputusan Akhir",
    description:
      "Ide baik, tim baik, tetapi pasar dan model bisnis kurang → Tidak Layak",
    conditions: {
      ide_masalah: "baik",
      pasar_kompetitor: "kurang",
      tim_sumber_daya: "baik",
      model_bisnis: "kurang",
    },
    result: { kelayakan_ide: "Tidak Layak" },
  },
  {
    id: "R8",
    set: "Keputusan Akhir",
    description:
      "Ide baik, pasar baik, tetapi tim dan model bisnis kurang → Tidak Layak",
    conditions: {
      ide_masalah: "baik",
      pasar_kompetitor: "baik",
      tim_sumber_daya: "kurang",
      model_bisnis: "kurang",
    },
    result: { kelayakan_ide: "Tidak Layak" },
  },
  {
    id: "R9",
    set: "Keputusan Akhir",
    description:
      "Ide baik, model bisnis baik, tetapi pasar dan tim kurang → Tidak Layak",
    conditions: {
      ide_masalah: "baik",
      pasar_kompetitor: "kurang",
      tim_sumber_daya: "kurang",
      model_bisnis: "baik",
    },
    result: { kelayakan_ide: "Tidak Layak" },
  },
  {
    id: "R10",
    set: "Keputusan Akhir",
    description:
      "Ide kurang, pasar baik, tetapi model bisnis kurang → Tidak Layak (tim diabaikan)",
    conditions: {
      ide_masalah: "kurang",
      pasar_kompetitor: "baik",
      model_bisnis: "kurang",
    },
    result: { kelayakan_ide: "Tidak Layak" },
  },
  {
    id: "R11",
    set: "Keputusan Akhir",
    description:
      "Ide kurang, pasar baik, model bisnis baik, tetapi tim kurang → Tidak Layak",
    conditions: {
      ide_masalah: "kurang",
      pasar_kompetitor: "baik",
      tim_sumber_daya: "kurang",
      model_bisnis: "baik",
    },
    result: { kelayakan_ide: "Tidak Layak" },
  },
  {
    id: "R12",
    set: "Keputusan Akhir",
    description:
      "Ide kurang dan pasar kurang → Tidak Layak (tim & model diabaikan)",
    conditions: {
      ide_masalah: "kurang",
      pasar_kompetitor: "kurang",
    },
    result: { kelayakan_ide: "Tidak Layak" },
  },
];
