import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { questions, steps } from "../data/questions";
import QuestionGroup from "./QuestionGroup";

export default function FormWizard({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [validationError, setValidationError] = useState("");
  const [shakingQuestions, setShakingQuestions] = useState([]);

  const totalSteps = steps.length;
  const currentQuestions = questions.filter((q) => q.step === currentStep);

  // ─── Handlers ──────────────────────────────────────────

  const handleSelect = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setValidationError("");
    setShakingQuestions([]);
  };

  const validateStep = () => {
    const unanswered = currentQuestions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      setValidationError(
        `Mohon jawab semua pertanyaan sebelum melanjutkan. (${unanswered.length} pertanyaan belum dijawab)`
      );
      setShakingQuestions(unanswered.map((q) => q.id));
      setTimeout(() => setShakingQuestions([]), 600);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    setValidationError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setValidationError("");
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    onSubmit(answers);
  };

  const isLastStep = currentStep === totalSteps - 1;

  // ─── Render ────────────────────────────────────────────

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Progress bar */}
      <div className="flex items-center justify-center mb-10 flex-wrap gap-y-2">
        {steps.map((step, i) => (
          <div key={step.index} className="flex items-center">
            <div className="flex items-center gap-2">
              {/* Step circle */}
              <div
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${
                    i < currentStep
                      ? "border-blue-600 bg-blue-600 text-white"
                      : i === currentStep
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
              >
                {i < currentStep ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : (
                  i + 1
                )}
              </div>
              {/* Step label (hidden on mobile) */}
              <span
                className={`text-sm font-medium hidden sm:inline transition-colors duration-300
                  ${i <= currentStep ? "text-blue-600" : "text-gray-400"}`}
              >
                {step.title}
              </span>
            </div>
            {/* Connector line */}
            {i < totalSteps - 1 && (
              <div
                className={`w-6 sm:w-10 h-px mx-1 sm:mx-2 transition-colors duration-300
                  ${i < currentStep ? "bg-blue-600" : "bg-gray-300"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        {/* Step header */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {steps[currentStep].title}
          </h3>
          <p className="text-gray-500 text-sm">
            {steps[currentStep].description}
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {currentQuestions.map((question) => (
            <QuestionGroup
              key={question.id}
              question={question}
              selectedValue={answers[question.id] || null}
              onSelect={handleSelect}
              isShaking={shakingQuestions.includes(question.id)}
            />
          ))}
        </div>

        {/* Validation message */}
        {validationError && (
          <div className="mt-6 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 font-medium text-center animate-fade-in">
            {validationError}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={handlePrev}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200
              ${currentStep === 0 ? "invisible" : ""}`}
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Sebelumnya
          </button>

          {isLastStep ? (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Evaluasi Sekarang
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
