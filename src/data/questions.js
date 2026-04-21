/**
 * Question Definitions - Form Generation Metadata
 *
 * Each question maps to one input attribute in the expert system.
 * Questions are grouped into steps that correspond to the four
 * evaluation aspects in the dependency diagram.
 */

export const steps = [
  {
    index: 0,
    title: "Ide & Masalah",
    description:
      "Evaluasi kejelasan masalah, kesesuaian solusi, dan keunikan ide bisnis digital Anda.",
  },
  {
    index: 1,
    title: "Pasar & Kompetitor",
    description:
      "Evaluasi kejelasan target pasar dan tingkat persaingan di industri yang dituju.",
  },
  {
    index: 2,
    title: "Tim & Sumber Daya",
    description:
      "Evaluasi kesiapan tim dari sisi keahlian, pengalaman, dan ketersediaan modal.",
  },
  {
    index: 3,
    title: "Model Bisnis",
    description:
      "Evaluasi strategi monetisasi dan potensi keberlanjutan model bisnis.",
  },
];

export const questions = [
  //  Step 0: Ide & Masalah 
  {
    id: "kejelasan_masalah",
    label: "Apakah masalah yang ingin diselesaikan sudah jelas dan spesifik?",
    description:
      "Masalah yang jelas berarti Anda dapat mendeskripsikan siapa yang mengalami masalah tersebut dan apa dampaknya.",
    options: [
      { value: "jelas", label: "Ya, masalah sudah jelas dan terdefinisi" },
      { value: "tidak_jelas", label: "Belum jelas atau masih terlalu umum" },
    ],
    step: 0,
  },
  {
    id: "kesesuaian_solusi",
    label:
      "Apakah solusi digital yang Anda tawarkan sesuai untuk menyelesaikan masalah tersebut?",
    description:
      "Solusi sesuai artinya pendekatan digital benar-benar menjawab akar masalah, bukan hanya gejala.",
    options: [
      { value: "sesuai", label: "Ya, solusi digital tepat untuk masalah ini" },
      {
        value: "tidak_sesuai",
        label: "Kurang sesuai atau belum tepat sasaran",
      },
    ],
    step: 0,
  },
  {
    id: "nilai_unik",
    label:
      "Apakah ide bisnis Anda memiliki nilai unik (Unique Value Proposition)?",
    description:
      "Nilai unik berarti ada pembeda yang jelas dari solusi atau produk yang sudah ada di pasar.",
    options: [
      { value: "ada", label: "Ya, ada keunikan yang membedakan" },
      { value: "tidak_ada", label: "Tidak ada pembeda signifikan" },
    ],
    step: 0,
  },

  //  Step 1: Pasar & Kompetitor 
  {
    id: "target_pasar",
    label: "Apakah target pasar Anda sudah jelas dan terdefinisi?",
    description:
      "Target pasar jelas berarti Anda tahu siapa calon pengguna/pelanggan, segmen usia, lokasi, dan perilakunya.",
    options: [
      { value: "jelas", label: "Ya, target pasar sudah jelas dan spesifik" },
      { value: "tidak_jelas", label: "Belum jelas atau terlalu luas" },
    ],
    step: 1,
  },
  {
    id: "tingkat_kompetitor",
    label: "Bagaimana tingkat persaingan di pasar yang Anda tuju?",
    description:
      "Pertimbangkan jumlah kompetitor yang sudah ada dan seberapa kuat posisi mereka.",
    options: [
      {
        value: "rendah",
        label: "Rendah - sedikit kompetitor atau belum ada pemain dominan",
      },
      {
        value: "tinggi",
        label: "Tinggi - banyak kompetitor atau ada pemain besar",
      },
    ],
    step: 1,
  },

  //  Step 2: Tim & Sumber Daya 
  {
    id: "skill_tim",
    label:
      "Apakah tim Anda memiliki keahlian teknis yang cukup untuk mengembangkan solusi ini?",
    description:
      "Keahlian teknis mencakup kemampuan programming, desain, manajemen produk, atau keahlian domain relevan.",
    options: [
      { value: "cukup", label: "Ya, tim memiliki keahlian yang memadai" },
      {
        value: "kurang",
        label: "Kurang - tim belum memiliki keahlian yang cukup",
      },
    ],
    step: 2,
  },
  {
    id: "pengalaman_tim",
    label: "Apakah tim memiliki pengalaman yang relevan di bidang ini?",
    description:
      "Pengalaman bisa berupa proyek serupa, pengalaman industri, atau track record di domain terkait.",
    options: [
      { value: "ada", label: "Ya, ada pengalaman relevan" },
      { value: "tidak_ada", label: "Tidak ada pengalaman relevan" },
    ],
    step: 2,
  },
  {
    id: "modal_awal",
    label: "Apakah modal awal yang tersedia mencukupi untuk memulai?",
    description:
      "Modal awal mencakup dana untuk pengembangan MVP, operasional awal, dan pemasaran dasar.",
    options: [
      { value: "cukup", label: "Ya, modal awal mencukupi" },
      {
        value: "tidak_cukup",
        label: "Tidak cukup - perlu sumber pendanaan tambahan",
      },
    ],
    step: 2,
  },

  //  Step 3: Model Bisnis 
  {
    id: "kejelasan_monetisasi",
    label: "Apakah cara menghasilkan uang (model monetisasi) sudah jelas?",
    description:
      "Model monetisasi bisa berupa langganan, freemium, iklan, transaksi, SaaS, atau model lainnya.",
    options: [
      { value: "jelas", label: "Ya, model monetisasi sudah jelas" },
      {
        value: "tidak_jelas",
        label: "Belum jelas cara menghasilkan pendapatan",
      },
    ],
    step: 3,
  },
  {
    id: "keberlanjutan",
    label:
      "Apakah model bisnis memiliki potensi keberlanjutan jangka panjang?",
    description:
      "Keberlanjutan berarti bisnis dapat bertahan dan tumbuh dalam jangka waktu yang lama, bukan hanya tren sesaat.",
    options: [
      { value: "jelas", label: "Ya, model bisnis berkelanjutan" },
      {
        value: "tidak_jelas",
        label: "Belum jelas atau ragu akan keberlanjutannya",
      },
    ],
    step: 3,
  },
];
