"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, ArrowRight } from "lucide-react"
import { ProcessingAnimation } from "@/components/processing-animation"
import { evaluateResume } from "@/app/services/resume-api"
import { toast } from "sonner"

export function FileUpload() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadStep, setUploadStep] = useState(0)


  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toast.error("Please select a resume PDF file");
      return;
    }

    if (!jobDescription) {
      toast.error("Please enter a job description");
      return;
    }

    setIsProcessing(true);
    setUploadStep(1);

    try {
      // Advance to step 2 quickly (file processing)
      setTimeout(() => setUploadStep(2), 500);
      
      // Advance to step 3 (AI analysis) after a short delay
      // This step will stay active for the duration of the API call
      setTimeout(() => setUploadStep(3), 1000);
      
      // Call API - this is the long-running step
      const result = await evaluateResume(file, jobDescription);
      
      // Store result
      localStorage.setItem('resumeAnalysisResult', JSON.stringify(result));
      
      // Set final step and wait before redirecting
      setUploadStep(4);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to results
      router.push("/scores");
    } catch (error) {
      
      console.error('Error during evaluation:', error);
      
      // Check if it's a timeout error and provide specific guidance
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      if (errorMessage.toLowerCase().includes('timeout')) {
        toast.error('Analysis timeout - The AI analysis is taking longer than expected. This can happen during high server load. Please try again in a few minutes.');
      } else {
        toast.error(`Failed to evaluate resume: ${errorMessage}`);
      }
      
      setIsProcessing(false);
      setUploadStep(0);
    }
  }

  if (isProcessing) {
    return <ProcessingAnimation currentStep={uploadStep} />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="resume" className="block text-sm font-medium text-white/80 font-founder-grotesk">
          Upload Your Resume
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="resume"
            className="flex flex-col items-center justify-center w-full h-24 md:h-32 border-2 border-dashed rounded-lg cursor-pointer bg-white/5 border-[#38bdf8]/30 hover:bg-white/10 transition-colors group"
          >
            <div className="flex flex-col items-center justify-center pt-4 pb-4 md:pt-5 md:pb-6">
              {file ? (
                <div className="flex items-center text-white">
                  <FileText className="w-6 h-6 md:w-8 md:h-8 text-[#38bdf8] mr-2" />
                  <span className="font-medium font-founder-grotesk text-sm md:text-base">{file.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div>
                    <Upload className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 text-white/70 group-hover:text-[#38bdf8] transition-colors" />
                  </div>
                  <p className="mb-1 md:mb-2 text-xs md:text-sm text-white/70 group-hover:text-white transition-colors">
                    <span className="font-semibold font-founder-grotesk">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-white/50 font-founder-grotesk">PDF, DOCX or TXT (MAX. 5MB)</p>
                </div>
              )}
            </div>
            <input
              id="resume"
              type="file"
              className="hidden"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileChange}
              aria-label="Upload Resume"
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="jobDescription" className="block text-sm font-medium text-white/80 font-founder-grotesk">
          Paste Job Description
        </label>
        <div>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here to compare with your resume..."
            className="min-h-[100px] md:min-h-[120px] bg-white/5 border-[#818cf8]/30 focus:border-[#818cf8] focus:ring-[#818cf8] placeholder:text-white/30 text-white font-founder-grotesk"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            aria-label="Job Description"
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8] hover:from-[#38bdf8]/90 hover:to-[#818cf8]/90 text-white flex items-center justify-center gap-2 font-founder-grotesk relative overflow-hidden group"
          aria-label="Analyze Resume"
        >
          <span className="relative z-10">Analyze Resume</span> 
          <div className="relative z-10">
            <ArrowRight className="w-4 h-4" />
          </div>
          <div className="absolute inset-0 h-full w-full translate-y-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] transition-transform duration-300 group-hover:translate-y-0"></div>
        </Button>
      </div>
    </form>
  )
}
