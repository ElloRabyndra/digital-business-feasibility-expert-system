import { Check } from "lucide-react";

export default function ProgressIndicator({
  steps,
  currentStep,
  currentIndex,
  totalQuestions,
}) {
  const progress = Math.round((currentIndex / totalQuestions) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 sticky top-5 z-10">
      {/* Step pills */}
      <div className="items-center justify-center gap-1.5 sm:gap-2 mb-3 flex-wrap hidden md:flex">
        {steps.map((step, i) => {
          const isDone = i < currentStep;
          const isCurrent = i === currentStep;

          return (
            <div
              key={step.index}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                ${
                  isDone
                    ? "bg-blue-50 text-blue-600"
                    : isCurrent
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-50 text-gray-400"
                }`}
            >
              {isDone ? (
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
              ) : (
                <span className="w-3.5 text-center">{i + 1}</span>
              )}
              <span className="hidden sm:inline">{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Counter */}
      <p className="text-xs text-gray-400 text-center mt-2">
        Pertanyaan {Math.min(currentIndex + 1, totalQuestions)} dari{" "}
        {totalQuestions}
      </p>
    </div>
  );
}
