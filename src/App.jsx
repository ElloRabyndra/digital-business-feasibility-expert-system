import { useState, useCallback } from "react";
import { Home } from "lucide-react";
import { ForwardChainingEngine } from "./engine/forwardChaining";
import HeroSection from "./components/HeroSection";
import ConversationFlow from "./components/ConversationFlow";
import ResultDisplay from "./components/ResultDisplay";

/**
 * App — Root component
 */
export default function App() {
  // "hero" | "conversation" | "result"
  const [view, setView] = useState("hero");
  const [result, setResult] = useState(null);

  const handleStart = useCallback(() => {
    setView("conversation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleComplete = useCallback((answers) => {
    const engine = new ForwardChainingEngine();
    engine.setFacts(answers);
    const evaluationResult = engine.evaluate();

    console.log("Forward Chaining Result");
    console.log("Input Facts:", answers);
    console.log("Aspect Results:", evaluationResult.aspek);
    console.log("Final Decision:", evaluationResult.kelayakan_ide);
    console.log("Inference Log:", evaluationResult.log);

    setResult(evaluationResult);
    setView("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleRetry = useCallback(() => {
    setResult(null);
    setView("conversation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleHome = useCallback(() => {
    setResult(null);
    setView("hero");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 antialiased">
      {/* Main Content */}
      <main>
        {view === "hero" && <HeroSection onStart={handleStart} />}
        {view === "conversation" && (
          <ConversationFlow onComplete={handleComplete} />
        )}
        {view === "result" && result && (
          <ResultDisplay result={result} onRetry={handleRetry} />
        )}
      </main>

      {/* Floating Home Button — only during conversation */}
      {view === "conversation" && (
        <button
          onClick={handleHome}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center z-50"
          title="Kembali ke Beranda"
        >
          <Home className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
