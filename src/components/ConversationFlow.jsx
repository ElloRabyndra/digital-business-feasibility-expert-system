import { useState, useEffect, useCallback, useRef } from "react";
import { questions, steps } from "../data/questions";
import QuestionCard from "./QuestionCard";
import ProgressIndicator from "./ProgressIndicator";

export default function ConversationFlow({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [phase, setPhase] = useState("typing"); // "typing" | "visible" | "answered"
  const [history, setHistory] = useState([]); // answered questions for scroll-back
  const bottomRef = useRef(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const currentStep = currentQuestion?.step ?? 0;
  const isComplete = currentIndex >= totalQuestions;

  // When currentIndex changes, start the typing → visible sequence
  useEffect(() => {
    if (isComplete) return;

    setPhase("typing");

    const timer = setTimeout(() => {
      setPhase("visible");
    }, 750);

    return () => clearTimeout(timer);
  }, [currentIndex, isComplete]);

  // Auto-scroll to bottom whenever conversation content changes
  useEffect(() => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [history.length, phase]);

  // When all questions are answered, trigger evaluation
  useEffect(() => {
    if (isComplete && Object.keys(answers).length === totalQuestions) {
      const timer = setTimeout(() => {
        onComplete(answers);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, answers, totalQuestions, onComplete]);

  const handleSelect = useCallback(
    (questionId, value, optionLabel) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
      setPhase("answered");

      setHistory((prev) => [
        ...prev,
        {
          question: currentQuestion,
          selectedValue: value,
          selectedLabel: optionLabel,
        },
      ]);



      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 400);
    },
    [currentQuestion]
  );

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Progress indicator */}
      <ProgressIndicator
        steps={steps}
        currentStep={currentStep}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
      />

      {/* Conversation area */}
      <div className="mt-6 space-y-5 pb-8">
        {/* Past questions (history) */}
        {history.map((item, i) => (
          <div key={i} className="animate-fade-in">
            {/* Mascot + question bubble (faded for past items) */}
            <div className="flex items-end gap-3 sm:gap-4">
              <img
                src="/mascot.png"
                alt="Assistant"
                className="w-24 h-24 sm:w-36 sm:h-36 object-contain shrink-0 opacity-30"
              />
              <div className="bg-white rounded-2xl rounded-bl-sm border border-gray-100 px-4 py-3 max-w-xl shadow-sm">
                <p className="text-sm text-gray-400">
                  {item.question.label}
                </p>
              </div>
            </div>
            {/* User answer (right aligned) */}
            <div className="flex justify-end mt-2">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs shadow-sm">
                <p className="text-sm font-medium">{item.selectedLabel}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Current active question */}
        {!isComplete && (
          <>
            {/* Typing indicator */}
            {phase === "typing" && (
              <div className="flex items-end gap-3 sm:gap-4 animate-fade-in">
                <img
                  src="/mascot.png"
                  alt="Assistant"
                  className="w-24 h-24 sm:w-36 sm:h-36 object-contain shrink-0"
                />
                <div className="bg-white rounded-2xl rounded-bl-sm border border-gray-100 px-5 py-4 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            {/* Question card */}
            {phase !== "typing" && (
              <QuestionCard
                question={currentQuestion}
                onSelect={handleSelect}
                disabled={phase === "answered"}
              />
            )}
          </>
        )}

        {/* Evaluating state */}
        {isComplete && (
          <div className="flex items-end gap-3 sm:gap-4 animate-fade-in">
            <img
              src="/mascot.png"
              alt="Assistant"
              className="w-24 h-24 sm:w-36 sm:h-36 object-contain shrink-0"
            />
            <div className="bg-white rounded-2xl rounded-bl-sm border border-gray-100 px-5 py-4 shadow-sm">
              <p className="text-sm text-gray-700 font-medium">
                Terima kasih atas jawabannya! Sedang mengevaluasi...
              </p>
              <div className="flex gap-1.5 mt-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </section>
  );
}
