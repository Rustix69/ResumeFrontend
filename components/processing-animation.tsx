"use client"

import { CheckCircle, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ProcessingAnimationProps {
  currentStep: number
}

export function ProcessingAnimation({ currentStep }: ProcessingAnimationProps) {
  const steps = [
    { id: 1, name: "Uploading resume" },
    { id: 2, name: "Analyzing keywords" },
    { id: 3, name: "Comparing with job description" },
    { id: 4, name: "Generating report" },
  ]

  // Calculate progress percentage based on current step
  const progressPercentage = Math.max(5, Math.min(100, (currentStep / steps.length) * 100));

  return (
    <div className="py-8">
      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center">
            <div className="relative">
              {currentStep > step.id ? (
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8] flex items-center justify-center shadow-lg shadow-[#38bdf8]/20">
                  <div>
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                </div>
              ) : currentStep === step.id ? (
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] flex items-center justify-center shadow-lg shadow-[#8b5cf6]/20">
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full border-2 border-white/20 flex items-center justify-center hover:scale-110 hover:border-white/30 transition-all">
                  <span className="text-sm font-medium text-white/50 font-founder-grotesk">{step.id}</span>
                </div>
              )}

              {step.id !== steps.length && (
                <div
                  className={`absolute left-5 top-10 w-0.5 h-12 ${
                    currentStep > step.id 
                      ? "bg-gradient-to-b from-[#38bdf8] to-[#818cf8]" 
                      : "bg-white/10"
                  }`}
                />
              )}
            </div>

            <div className="ml-4">
              <p
                className={`font-medium font-founder-grotesk ${currentStep >= step.id ? "text-white" : "text-white/50"}`}
              >
                {step.name}
              </p>
              
              {currentStep === step.id && (
                <div className="flex items-center">
                  <p className="text-sm text-[#38bdf8] font-founder-grotesk mr-2">
                    <span className="opacity-75">
                      In progress...
                    </span>
                  </p>
                  {/* Small progress indicator for current step */}
                  <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#38bdf8] animate-progress"
                    />
                  </div>
                </div>
              )}
              
              {currentStep > step.id && (
                <p className="text-sm text-[#818cf8] font-founder-grotesk">
                  Completed
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {currentStep === steps.length && (
        <div className="mt-12 text-center">
          <p className="text-white font-medium font-founder-grotesk mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">
              Analysis complete! Redirecting to Results Page...
            </span>
          </p>
          <div className="mt-4 h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8] rounded-full animate-fill-width"
            />
          </div>
        </div>
      )}
    </div>
  )
}
