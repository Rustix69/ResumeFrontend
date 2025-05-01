"use client"

import { CheckCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
      <motion.h3 
        className="text-xl font-bold text-white mb-8 text-center font-founder-grotesk"
        variants={itemVariants}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">
          Processing Your Resume
        </span>
      </motion.h3>

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
                    height: 48
                  }}
                  transition={{ delay: 0.5, duration: 0.8 }}
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
                  <motion.p 
                    className="text-sm text-[#38bdf8] font-founder-grotesk"
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
                Analysis complete! Redirecting to results...
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
