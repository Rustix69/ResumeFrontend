"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, ArrowRight } from "lucide-react"
import { ProcessingAnimation } from "@/components/processing-animation"
import { motion, AnimatePresence } from "framer-motion"

export function FileUpload() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadStep, setUploadStep] = useState(0)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !jobDescription) {
      alert("Please upload a resume and paste a job description")
      return
    }

    setIsProcessing(true)

    // Simulate processing steps
    setUploadStep(1)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setUploadStep(2)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setUploadStep(3)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setUploadStep(4)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to results page
    router.push("/scores")
  }

  if (isProcessing) {
    return <ProcessingAnimation currentStep={uploadStep} />
  }

  return (
    <AnimatePresence>
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <label htmlFor="resume" className="block text-sm font-medium text-white/80 font-founder-grotesk">
            Upload Your Resume
          </label>
          <div className="flex items-center justify-center w-full">
            <motion.label
              htmlFor="resume"
              className="flex flex-col items-center justify-center w-full h-24 md:h-32 border-2 border-dashed rounded-lg cursor-pointer bg-white/5 border-[#38bdf8]/30 hover:bg-white/10 transition-colors group"
              whileHover={{ 
                scale: 1.02,
                borderColor: "rgba(56, 189, 248, 0.6)",
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center justify-center pt-4 pb-4 md:pt-5 md:pb-6">
                <AnimatePresence mode="wait">
                  {file ? (
                    <motion.div 
                      className="flex items-center text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", damping: 15, stiffness: 400 }}
                    >
                      <FileText className="w-6 h-6 md:w-8 md:h-8 text-[#38bdf8] mr-2" />
                      <span className="font-medium font-founder-grotesk text-sm md:text-base">{file.name}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        whileHover={{ y: -5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Upload className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 text-white/70 group-hover:text-[#38bdf8] transition-colors" />
                      </motion.div>
                      <p className="mb-1 md:mb-2 text-xs md:text-sm text-white/70 group-hover:text-white transition-colors">
                        <span className="font-semibold font-founder-grotesk">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-white/50 font-founder-grotesk">PDF, DOCX or TXT (MAX. 5MB)</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <input
                id="resume"
                type="file"
                className="hidden"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileChange}
                aria-label="Upload Resume"
              />
            </motion.label>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label htmlFor="jobDescription" className="block text-sm font-medium text-white/80 font-founder-grotesk">
            Paste Job Description
          </label>
          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here to compare with your resume..."
              className="min-h-[100px] md:min-h-[120px] bg-white/5 border-[#818cf8]/30 focus:border-[#818cf8] focus:ring-[#818cf8] placeholder:text-white/30 text-white font-founder-grotesk"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              aria-label="Job Description"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8] hover:from-[#38bdf8]/90 hover:to-[#818cf8]/90 text-white flex items-center justify-center gap-2 font-founder-grotesk relative overflow-hidden group"
              aria-label="Analyze Resume"
            >
              <span className="relative z-10">Analyze Resume</span> 
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
              <div className="absolute inset-0 h-full w-full translate-y-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] transition-transform duration-300 group-hover:translate-y-0"></div>
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </AnimatePresence>
  )
}
