import { useEffect, useRef } from "react";
import { Info } from "lucide-react";

export default function QuestionCard({ question, onSelect, disabled }) {
  const cardRef = useRef(null);

  // Auto-scroll into view when this card appears
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div ref={cardRef} className="animate-fade-in">
      {/* Mascot + question bubble */}
      <div className="flex items-end gap-3 sm:gap-4">
        <img
          src="/mascot.png"
          alt="Assistant"
          className="w-24 h-24 sm:w-36 sm:h-36 object-contain shrink-0 animate-mascot-enter drop-shadow-md"
        />
        <div className="bg-white rounded-2xl rounded-bl-sm border border-gray-100 px-4 sm:px-5 py-3.5 sm:py-4 flex-1 max-w-xl shadow-sm">
          {/* Question text */}
          <p className="text-sm sm:text-base font-semibold text-gray-800 leading-relaxed">
            {question.label}
          </p>

          {/* Description / helper text */}
          {question.description && (
            <div className="flex items-start gap-1.5 mt-2.5 pt-2.5 border-t border-gray-50">
              <Info className="w-3.5 h-3.5 text-gray-300 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-400 leading-relaxed">
                {question.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Option buttons — aligned under the bubble */}
      <div className="ml-[108px] sm:ml-[160px] mt-3 flex flex-col sm:flex-row gap-2">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() =>
              !disabled && onSelect(question.id, option.value, option.label)
            }
            disabled={disabled}
            className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 cursor-pointer
              ${
                disabled
                  ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                  : "border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.98]"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
