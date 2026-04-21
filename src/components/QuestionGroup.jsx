export default function QuestionGroup({
  question,
  selectedValue,
  onSelect,
  isShaking,
}) {
  return (
    <div className={isShaking ? "animate-shake" : ""}>
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        {question.label}
      </label>
      {question.description && (
        <p className="text-xs text-gray-400 mb-4">{question.description}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <div
              key={option.value}
              onClick={() => onSelect(question.id, option.value)}
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-sm
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
            >
              <div className="flex items-center gap-3">
                {/* Radio indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
                    ${isSelected ? "border-blue-600" : "border-gray-300"}`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full bg-blue-600 transition-transform duration-200
                      ${isSelected ? "scale-100" : "scale-0"}`}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {option.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
