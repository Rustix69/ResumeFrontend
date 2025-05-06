"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScoreCard } from "@/components/score-card"
import { ScoreTable } from "@/components/score-table"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import { SignUpButton } from "@/components/sign-up-button"
import Script from "next/script"
import { LoadingAnalysis } from "@/components/loading-analysis"
import { toast } from "sonner"
import { motion } from "framer-motion"

// Define the response structure to type check our data
interface SkillBreakdown {
  keyword: string;
  found: string | boolean;
  comment: string;
}

interface AnalysisSection {
  score: number;
  summary: string;
  breakdown: SkillBreakdown[];
}

interface AnalysisResult {
  technical_skills: AnalysisSection;
  projects_experience: AnalysisSection;
  education_achievements: AnalysisSection;
  formatting_compatibility: AnalysisSection;
  soft_skills: AnalysisSection;
  final_score: number;
  summary: string;
}

export default function ScoresPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the data from localStorage
    try {
      const storedResult = localStorage.getItem('resumeAnalysisResult');
      if (storedResult) {
        const parsedData = JSON.parse(storedResult);

        // Validate the data structure
        if (!validateAnalysisResult(parsedData)) {
          toast.error("Invalid data format received from API");
          setIsLoading(false);
          return;
        }

        setAnalysisData(parsedData);
      } else {
        // If no data in localStorage, check if we should redirect
        toast.error("No analysis data found. Please submit a resume first.");
      }
    } catch (error) {
      console.error('Error loading analysis data:', error);
      toast.error('Error loading analysis results.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Validate the analysis result structure
  const validateAnalysisResult = (data: any): data is AnalysisResult => {
    if (!data) return false;

    // Check main sections
    const requiredSections = [
      'technical_skills',
      'projects_experience',
      'education_achievements',
      'formatting_compatibility',
      'soft_skills'
    ];

    for (const section of requiredSections) {
      if (!data[section] ||
        typeof data[section].score !== 'number' ||
        typeof data[section].summary !== 'string' ||
        !Array.isArray(data[section].breakdown)) {
        console.error(`Invalid or missing section: ${section}`, data[section]);
        return false;
      }
    }

    // Check final score and summary
    if (typeof data.final_score !== 'number' || typeof data.summary !== 'string') {
      console.error('Missing final_score or summary');
      return false;
    }

    return true;
  };

  // Show loading state if data is not ready
  if (isLoading) {
    return <LoadingAnalysis step={3} />;
  }

  // If no data is found after loading
  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a103c] to-[#2d1b4e] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Analysis Data Found</h1>
          <p className="mb-8">Please upload a resume and job description first.</p>
          <Link href="/" className="bg-gradient-to-r from-[#38bdf8] to-[#818cf8] text-white px-6 py-3 rounded-md">
            Go to Upload Page
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to determine status display format
  const getStatusFromFound = (found: string | boolean) => {
    if (typeof found === 'boolean') {
      return found ? "Yes" : "No";
    }
    if (found === "Found") return "Yes";
    if (found === "Partial") return "Partial";
    return "No";
  };

  // Helper function to convert found to boolean or partial for component
  const getFoundValue = (found: string | boolean) => {
    if (typeof found === 'boolean') {
      return found;
    }
    if (found === "Found") return true;
    if (found === "Partial") return "partial";
    return false;
  };

  // JSON-LD schema for the scores page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Resume Analysis Results - ResumeAI",
    "description": analysisData.summary,
    "logo": process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/resume-logo.svg` : "https://resume-ats-tracker.vercel.app/resume-logo.svg",
    "mainEntity": {
      "@type": "Report",
      "name": "Resume ATS Analysis Report",
      "about": {
        "@type": "Thing",
        "name": "Resume Analysis"
      },
      "reportNumber": "RES-" + new Date().toISOString().split('T')[0],
      "dateCreated": new Date().toISOString(),
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    "specialty": "Resume Analysis and Optimization",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a103c] to-[#2d1b4e] text-white overflow-hidden">
      {/* JSON-LD Schema */}
      <Script
        id="scores-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6b21a8]/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#3b82f6]/10 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6366f1]/10 blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#ec4899]/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Navigation */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-white text-2xl font-bold font-founder-grotesk tracking-tight flex items-center">
            <Link href="/" aria-label="ResumeAI Home" className="flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">ResumeAI</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-white/80 hover:text-white font-founder-grotesk transition-colors">
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-white/80 hover:text-white font-founder-grotesk transition-colors"
            >
              How It Works
            </Link>
            <Link href="/#pricing" className="text-white/80 hover:text-white font-founder-grotesk transition-colors">
              Pricing
            </Link>
            <Link
              href="/#testimonials"
              className="text-white/80 hover:text-white font-founder-grotesk transition-colors"
            >
              Testimonials
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8 relative z-10">
        <div className="mb-6 md:mb-8">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-white font-founder-grotesk">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>

        <div className="relative group mb-6 md:mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-[#1a103c]/80 backdrop-blur-xl rounded-xl p-4 md:p-8 shadow-2xl border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-white font-founder-grotesk tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">
                    ATS Resume Match Analysis
                  </span>
                </h1>
                <p className="text-white/50 mt-2 font-founder-grotesk text-sm">Analyzed on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              <ScoreCard title="Final ATS Score" score={analysisData.final_score.toString()} maxScore="100" color="#8b5cf6" />
              <ScoreCard title="Technical Skills" score={analysisData.technical_skills.score.toString()} maxScore="40" color="#38bdf8" />
              <ScoreCard title="Experience" score={analysisData.projects_experience.score.toString()} maxScore="30" color="#818cf8" />
              <ScoreCard
                title="Education & Skills"
                score={(analysisData.education_achievements.score + analysisData.formatting_compatibility.score + analysisData.soft_skills.score).toString()}
                maxScore="30"
                color="#ec4899"
              />
            </div>

            <div className="space-y-6 md:space-y-8">
              <ScoreTable
                title="1. Technical Skills Match (Weight: 40%)"
                score={`${analysisData.technical_skills.score}/40`}
                description={analysisData.technical_skills.summary}
                data={analysisData.technical_skills.breakdown.map(item => ({
                  skill: item.keyword,
                  found: getFoundValue(item.found),
                  status: getStatusFromFound(item.found),
                  comments: item.comment
                }))}
              />

              <ScoreTable
                title="2. Projects & Experience (Weight: 30%)"
                score={`${analysisData.projects_experience.score}/30`}
                description={analysisData.projects_experience.summary}
                data={analysisData.projects_experience.breakdown.map(item => ({
                  skill: item.keyword,
                  found: getFoundValue(item.found),
                  status: getStatusFromFound(item.found),
                  comments: item.comment
                }))}
              />

              <ScoreTable
                title="3. Education & Achievements (Weight: 10%)"
                score={`${analysisData.education_achievements.score}/10`}
                description={analysisData.education_achievements.summary}
                data={analysisData.education_achievements.breakdown.map(item => ({
                  skill: item.keyword,
                  found: getFoundValue(item.found),
                  status: getStatusFromFound(item.found),
                  comments: item.comment
                }))}
              />

              <ScoreTable
                title="4. Formatting & ATS Compatibility (Weight: 10%)"
                score={`${analysisData.formatting_compatibility.score}/10`}
                description={analysisData.formatting_compatibility.summary}
                data={analysisData.formatting_compatibility.breakdown.map(item => ({
                  skill: item.keyword,
                  found: getFoundValue(item.found),
                  status: getStatusFromFound(item.found),
                  comments: item.comment
                }))}
              />

              <ScoreTable
                title="5. Soft Skills (Weight: 10%)"
                score={`${analysisData.soft_skills.score}/10`}
                description={analysisData.soft_skills.summary}
                data={analysisData.soft_skills.breakdown.map(item => ({
                  skill: item.keyword,
                  found: getFoundValue(item.found),
                  status: getStatusFromFound(item.found),
                  comments: item.comment
                }))}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6 md:mb-8">
          <Link
            href="/"
            className="relative inline-flex h-10 md:h-12 items-center justify-center rounded-md px-6 md:px-8 text-sm font-medium font-founder-grotesk group overflow-hidden"
          >
            <span className="relative z-10 text-white">Analyze Another Resume</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </main>

      <footer className="py-6 md:py-8 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Mobile / Small screen layout */}
            <div className="md:hidden space-y-1 text-white font-founder-grotesk text-xs flex flex-col items-center">
              <p className="flex items-center gap-1">
                Made with
                <motion.span
                  className="text-[#ec4899]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ❤️
                </motion.span>
                by rustix69
              </p>
              <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
            </div>

            {/* Medium and up screen layout */}
            <p className="hidden md:flex text-white font-founder-grotesk text-sm items-center justify-center gap-2">
              © {new Date().getFullYear()} ResumeAI. All rights reserved. Made with
              <motion.span
                className="text-[#ec4899]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ❤️
              </motion.span>
              by rustix69
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
