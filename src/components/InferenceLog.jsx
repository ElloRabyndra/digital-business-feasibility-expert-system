import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function InferenceLog({ log }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hidden md:block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center gap-2 text-left font-semibold text-gray-700 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <ChevronRight
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
        Log Proses Inferensi (Forward Chaining)
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2 space-y-3 animate-fade-in">
          {log.map((entry, i) => {
            if (entry.type === "phase") {
              return (
                <div key={i} className="pt-3 pb-1 border-b border-gray-100">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {entry.label}
                  </p>
                </div>
              );
            }

            if (entry.type === "rule_fired") {
              return (
                <div
                  key={i}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-xs"
                >
                  {/* Rule header */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-blue-100 text-blue-700 text-[10px] font-bold shrink-0">
                      {entry.ruleId}
                    </span>
                    <span className="font-medium text-gray-700">
                      {entry.description}
                    </span>
                  </div>

                  {/* Conditions and result */}
                  <div className="ml-8 space-y-1 text-gray-500">
                    <p>
                      <span className="text-gray-400">IF </span>
                      {Object.entries(entry.conditions)
                        .map(
                          ([k, v]) =>
                            `${k} = ${v}`
                        )
                        .join("  AND  ")}
                    </p>
                    <p>
                      <span className="text-gray-400">THEN </span>
                      {Object.entries(entry.result).map(([k, v]) => (
                        <span key={k} className="font-bold text-blue-600">
                          {k} = {v}
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* CF calculation details */}
                  {entry.cfRule !== undefined && (
                    <div className="ml-8 mt-2 px-2.5 py-1.5 bg-amber-50 border border-amber-100 rounded text-[11px] text-amber-800 font-mono">
                      <span className="text-amber-500 font-sans font-semibold">CF: </span>
                      CF Rule: {entry.cfRule}
                      {" | "}
                      CF Premis: min(
                      {entry.cfPremiseDetails
                        ? entry.cfPremiseDetails.join(", ")
                        : entry.cfPremises}
                      ) = {entry.cfPremises}
                      {" | "}
                      CF Hasil: {entry.cfPremises} × {entry.cfRule} ={" "}
                      <span className="font-bold text-amber-900">
                        {entry.cfResult.toFixed(4).replace(/0+$/, "").replace(/\.$/, "")}
                      </span>
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
}
