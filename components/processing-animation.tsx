"use client"

import { CheckCircle, Loader2, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

interface ProcessingAnimationProps {
  currentStep: number
}

export function ProcessingAnimation({ currentStep }: ProcessingAnimationProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [step3StartTime, setStep3StartTime] = useState<number | null>(null)

  const steps = [
    { id: 1, name: "Uploading resume" },
    { id: 2, name: "Extracting text from PDF" },
    { id: 3, name: "Analyzing with AI (this may take 2-5 minutes)" },
    { id: 4, name: "Generating detailed report" },
  ]

  // Track when step 3 starts and update elapsed time
  useEffect(() => {
    if (currentStep === 3 && step3StartTime === null) {
      setStep3StartTime(Date.now())
    }
  }, [currentStep, step3StartTime])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (currentStep === 3 && step3StartTime !== null) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - step3StartTime) / 1000))
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentStep, step3StartTime])

  // Calculate progress percentage based on current step
  const progressPercentage = Math.max(5, Math.min(100, (currentStep / steps.length) * 100));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
      className="py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="space-y-8">
        {steps.map((step) => (
          <motion.div 
            key={step.id} 
            className="flex items-center"
            variants={itemVariants}
          >
            <div className="relative">
              {currentStep > step.id ? (
                <motion.div 
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8] flex items-center justify-center shadow-lg shadow-[#38bdf8]/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CheckCircle className="h-5 w-5 text-white" />
                  </motion.div>
                </motion.div>
              ) : currentStep === step.id ? (
                <motion.div 
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] flex items-center justify-center shadow-lg shadow-[#8b5cf6]/20"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 10px 15px -3px rgba(139, 92, 246, 0.2)",
                      "0 10px 15px -3px rgba(139, 92, 246, 0.4)",
                      "0 10px 15px -3px rgba(139, 92, 246, 0.2)"
                    ]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2
                  }}
                >
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                </motion.div>
              ) : (
                <motion.div 
                  className="h-10 w-10 rounded-full border-2 border-white/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, borderColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  <span className="text-sm font-medium text-white/50 font-founder-grotesk">{step.id}</span>
                </motion.div>
              )}

              {step.id !== steps.length && (
                <motion.div
                  className={`absolute left-5 top-10 w-0.5 h-12`}
                  initial={{ backgroundColor: "rgba(255, 255, 255, 0.1)", height: 0 }}
                  animate={{ 
                    backgroundColor: currentStep > step.id 
                      ? "linear-gradient(to bottom, #38bdf8, #818cf8)" 
                      : "rgba(255, 255, 255, 0.1)",
                    height: 48,
                    transition: { duration: 0.5 }
                  }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              )}
            </div>

            <div className="ml-4">
              <motion.p
                className={`font-medium font-founder-grotesk ${currentStep >= step.id ? "text-white" : "text-white/50"}`}
                animate={{ 
                  color: currentStep >= step.id 
                    ? "rgba(255, 255, 255, 1)" 
                    : "rgba(255, 255, 255, 0.5)" 
                }}
                transition={{ duration: 0.3 }}
              >
                {step.name}
              </motion.p>
              <AnimatePresence>
                {currentStep === step.id && (
                  <motion.div className="flex items-center">
                    <motion.p 
                      className="text-sm text-[#38bdf8] font-founder-grotesk mr-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        In progress...
                      </motion.span>
                    </motion.p>
                    {/* Small progress indicator for current step */}
                    <motion.div 
                      className="w-16 h-1 bg-white/10 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div 
                        className="h-full bg-[#38bdf8]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 2,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )}
                {currentStep > step.id && (
                  <motion.p 
                    className="text-sm text-[#818cf8] font-founder-grotesk"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Completed
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional information for step 3 (AI Analysis) */}
      <AnimatePresence>
        {currentStep === 3 && (
          <motion.div 
            className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className="text-white/80 text-sm font-founder-grotesk mb-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🤖 Our AI is thoroughly analyzing your resume...
            </motion.p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/60 text-xs font-founder-grotesk">
                This process involves deep semantic analysis and comparison with the job description.
              </p>
              <div className="flex items-center text-white/50 text-xs font-founder-grotesk">
                <Clock className="h-3 w-3 mr-1" />
                <span>{Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
            <p className="text-white/50 text-xs font-founder-grotesk">
              Please be patient as this may take a few minutes depending on server load.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentStep === steps.length && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className="text-white font-medium font-founder-grotesk mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 0px rgba(56, 189, 248, 0)",
                  "0 0 10px rgba(56, 189, 248, 0.5)",
                  "0 0 0px rgba(56, 189, 248, 0)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">
                Analysis complete! Redirecting to Results Page...
              </span>
            </motion.p>
            <div className="mt-4 h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
