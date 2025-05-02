import { ProcessingAnimation } from "./processing-animation";

interface LoadingAnalysisProps {
  step: number;
}

export function LoadingAnalysis({ step }: LoadingAnalysisProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1f] via-[#1a103c] to-[#2d1b4e]">
      <ProcessingAnimation currentStep={step} />
    </div>
  );
} 