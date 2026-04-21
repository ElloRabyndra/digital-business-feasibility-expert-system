import { ArrowRight, ClipboardList, Sparkles, Target, Zap } from "lucide-react";

export default function HeroSection({ onStart }) {
  return (
    <section className="min-h-screen flex items-center bg-gray-50 px-6 sm:px-12 lg:px-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center -mt-8">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6 w-fit">
              <Sparkles className="w-4 h-4" />
              Forward Chaining Expert System
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
              Evaluasi Kelayakan
              <br />
              <span className="text-blue-600">Ide Bisnis Digital</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-10 max-w-lg">
              Sistem pakar berbasis rule untuk evaluasi awal kelayakan bisnis
              digital bagi mahasiswa dan technopreneur.
            </p>

            {/* Feature badges */}
            <div className="flex lg:hidden flex-wrap gap-3 sm:gap-4  -mt-4 mb-10">
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-lg text-sm sm:text-base text-gray-600 shadow-sm">
                <ClipboardList className="w-4 h-4 text-gray-400" />
                10 Pertanyaan
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-lg text-sm sm:text-base text-gray-600 shadow-sm">
                <Zap className="w-4 h-4 text-gray-400" />
                26 Rule
              </div>
              <div className="hidden sm:flex lg:hidden items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-lg text-sm sm:text-base text-gray-600 shadow-sm">
                <Target className="w-4 h-4 text-gray-400" />
                Hasil Instan
              </div>
            </div>

            {/* CTA */}
            <div className="-mt-3">
              <button
                onClick={onStart}
                className="inline-flex items-center gap-3 bg-blue-600 text-white rounded-xl px-10 py-4 font-semibold text-base sm:text-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                Mulai Evaluasi Sekarang
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right: Mascot */}
          <div className="hidden lg:flex items-center justify-center order-1 lg:order-2 xl:-ml-6">
            <img
              src="/hero-mascot.png"
              alt="Expert System Assistant"
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:h-auto lg:max-w-xl xl:max-w-4xl object-contain animate-float drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
