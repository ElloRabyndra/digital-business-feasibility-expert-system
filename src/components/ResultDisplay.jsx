import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Users,
  Wallet,
  RotateCcw,
} from "lucide-react";
import InferenceLog from "./InferenceLog";

const ASPECT_META = [
  {
    key: "ide_masalah",
    label: "Ide & Masalah",
    Icon: Lightbulb,
    desc_baik: "Ide bisnis jelas, solusi sesuai dan memiliki keunikan.",
    desc_kurang:
      "Ide bisnis perlu perbaikan dari sisi kejelasan atau keunikan.",
  },
  {
    key: "pasar_kompetitor",
    label: "Pasar & Kompetitor",
    Icon: BarChart3,
    desc_baik: "Target pasar jelas dengan tingkat kompetisi yang kondusif.",
    desc_kurang: "Target pasar belum jelas atau persaingan terlalu tinggi.",
  },
  {
    key: "tim_sumber_daya",
    label: "Tim & Sumber Daya",
    Icon: Users,
    desc_baik: "Tim memiliki keahlian dan sumber daya yang memadai.",
    desc_kurang: "Tim perlu peningkatan keahlian atau sumber daya tambahan.",
  },
  {
    key: "model_bisnis",
    label: "Model Bisnis",
    Icon: Wallet,
    desc_baik: "Model monetisasi jelas dan berkelanjutan.",
    desc_kurang: "Model bisnis perlu dirancang ulang untuk keberlanjutan.",
  },
];

const VERDICT_CONFIG = {
  Layak: {
    Icon: CheckCircle,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    titleColor: "text-blue-700",
    cardBg: "bg-blue-50 border-blue-200",
    badgeClass: "bg-blue-100 text-blue-700 border-2 border-blue-200",
    description:
      "Ide bisnis digital Anda dinilai layak untuk dikembangkan. Semua aspek menunjukkan kesiapan yang baik. Lanjutkan ke tahap validasi dan pengembangan MVP!",
  },
  "Cukup Layak": {
    Icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
    titleColor: "text-amber-700",
    cardBg: "bg-amber-50 border-amber-200",
    badgeClass: "bg-amber-100 text-amber-700 border-2 border-amber-200",
    description:
      "Ide bisnis digital Anda cukup layak, namun masih ada aspek yang perlu diperbaiki. Perkuat aspek yang kurang sebelum melanjutkan ke tahap pengembangan.",
  },
  "Tidak Layak": {
    Icon: XCircle,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
    titleColor: "text-red-700",
    cardBg: "bg-red-50 border-red-200",
    badgeClass: "bg-red-100 text-red-700 border-2 border-red-200",
    description:
      "Ide bisnis digital Anda saat ini belum layak untuk dikembangkan. Disarankan untuk mengevaluasi ulang aspek-aspek yang masih kurang secara menyeluruh.",
  },
};

export default function ResultDisplay({ result, onRetry }) {
  const verdict = VERDICT_CONFIG[result.kelayakan_ide] || VERDICT_CONFIG["Tidak Layak"];
  const VerdictIcon = verdict.Icon;

  return (
    <section className="max-w-3xl mx-auto px-10 sm:px-6 py-8 animate-fade-in">
      {/* ── Verdict Card ─────────────────────────────────── */}
      <div className={`rounded-2xl border shadow-sm p-6 sm:p-8 mb-6 ${verdict.cardBg}`}>
        <div className="flex items-center gap-5">
          {/* Icon */}
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${verdict.iconBg} flex items-center justify-center shrink-0`}
          >
            <VerdictIcon className={`w-7 h-7 sm:w-8 sm:h-8 ${verdict.iconColor}`} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
              Hasil Evaluasi
            </p>
            <h2 className={`text-2xl sm:text-3xl font-bold ${verdict.titleColor}`}>
              {result.kelayakan_ide}
            </h2>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mt-4">
          {verdict.description}
        </p>
      </div>

      {/* ── Aspect Breakdown ─────────────────────────────── */}
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
          Breakdown Per Aspek
        </h3>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {ASPECT_META.map((meta, index) => {
          const value = result.aspek[meta.key];
          const isBaik = value === "baik";
          const AspectIcon = meta.Icon;

          return (
            <div
              key={meta.key}
              className={`bg-white rounded-xl border p-5 transition-all duration-300 hover:shadow-md animate-slide-up stagger-${index + 1}
                ${isBaik ? "border-blue-200" : "border-red-200"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AspectIcon className="w-4 h-4 text-gray-500" />
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {meta.label}
                  </h4>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                    ${isBaik ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}
                >
                  {isBaik ? "Baik" : "Kurang"}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {isBaik ? meta.desc_baik : meta.desc_kurang}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Inference Log ────────────────────────────────── */}
      <InferenceLog log={result.log} />

      {/* ── Retry Button ─────────────────────────────────── */}
      <div className="text-center pb-8 mt-8">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Evaluasi Ulang
        </button>
      </div>
    </section>
  );
}
