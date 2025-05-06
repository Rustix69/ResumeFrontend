"use client"

import Link from "next/link"
import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { FeatureCard } from "@/components/feature-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { CheckCircle, BarChart2, Clock, Search, Award, Zap } from "lucide-react"
import Script from "next/script"
import { MobileMenu } from "@/components/mobile-menu"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // JSON-LD schema for the homepage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ResumeAI - AI-Powered Resume ATS Tracker & Optimizer",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://resume-ats-tracker.vercel.app",
    "description": "Boost your job hunt with ResumeAI. Our AI-powered platform analyzes your resume against job descriptions to optimize keywords, track applications, and improve interview chances.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "logo": process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/resume-logo.svg` : "https://resume-ats-tracker.vercel.app/resume-logo.svg",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "AI resume analysis",
      "Keyword optimization",
      "ATS compatibility check",
      "Job application tracking",
      "Personalized recommendations"
    ],
    "screenshot": "/resume-logo.svg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1256"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a103c] to-[#2d1b4e] text-white overflow-hidden">
      {/* JSON-LD Schema */}
      <Script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6b21a8]/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#3b82f6]/10 via-transparent to-transparent"></div>
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6366f1]/10 blur-3xl animate-pulse"
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#ec4899]/10 blur-3xl animate-pulse"
          style={{ animationDelay: '1s', animationDuration: '10s' }}
        ></div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Navigation */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div 
            className="text-white text-2xl font-bold font-founder-grotesk tracking-tight flex items-center"
          >
            <Link href="/" aria-label="ResumeAI Home" className="flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">ResumeAI</span>
            </Link>
          </div>
          
          {/* Mobile Menu Button - only visible on mobile */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-white p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Mobile Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 mobile-hidden">
            {["Features", "How It Works", "Coming Features", "Testimonials"].map((item, index) => (
              <div
                key={item}
                className="transition-transform hover:translate-y-[-2px]"
              >
                <Link 
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} 
                  className="text-white/80 hover:text-white font-founder-grotesk transition-colors"
                >
                  {item}
                </Link>
              </div>
            ))}
          </nav>
          <div
            className="mobile-hidden"
          >
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("User Based Resume dashboard soon");
              }}
              className="relative inline-flex h-10 items-center justify-center rounded-md border border-[#38bdf8] bg-transparent px-8 text-sm font-medium text-white hover:bg-[#38bdf8]/10 transition-colors font-founder-grotesk group overflow-hidden"
            >
              <span className="relative z-10">Sign up</span>
              <div className="absolute inset-0 h-full w-full translate-y-full bg-gradient-to-t from-[#38bdf8] to-[#818cf8] opacity-30 transition-transform duration-300 group-hover:translate-y-0"></div>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 
              className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-founder-grotesk tracking-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">
                AI-powered resume
              </span>{" "}
              tracking & optimization
            </h1>
            <div className="mt-8 md:mt-16 grid grid-cols-2 gap-4 md:gap-8">
              <div>
                <p className="text-white text-3xl md:text-4xl font-bold font-founder-grotesk">
                  6K<span className="text-[#38bdf8]">+</span>
                </p>
                <p className="text-white/70 font-founder-grotesk text-sm md:text-base">Successful Applications</p>
              </div>
              <div>
                <p className="text-white text-3xl md:text-4xl font-bold font-founder-grotesk">
                  99<span className="text-[#818cf8]">%</span>
                </p>
                <p className="text-white/70 font-founder-grotesk text-sm md:text-base">LLM Accuracy Rate</p>
              </div>
            </div>
            <div className="mt-6 md:mt-8">
              <div className="inline-block border-b-2 border-[#818cf8] pb-1 text-white font-semibold font-founder-grotesk text-sm md:text-base">
                INTELLIGENT ANALYSIS <span className="text-[#ec4899]">✱</span>
              </div>
              <p className="mt-3 md:mt-4 text-white/70 max-w-lg font-founder-grotesk text-sm md:text-base">
                Our advanced LLM-powered platform analyzes your resume against job descriptions with unmatched precision. 
                Get personalized recommendations, keyword optimization, and intelligent insights to dramatically improve 
                your chances of landing interviews and tracking application success.
              </p>
              <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-4">
                <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] text-xs font-medium font-founder-grotesk hover:bg-[#38bdf8]/30 hover:scale-105 transition-all">
                  LLM-Powered Analysis
                </span>
                <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full bg-[#818cf8]/20 text-[#818cf8] text-xs font-medium font-founder-grotesk hover:bg-[#818cf8]/30 hover:scale-105 transition-all">
                  NLP Keyword Matching
                </span>
                <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full bg-[#ec4899]/20 text-[#ec4899] text-xs font-medium font-founder-grotesk hover:bg-[#ec4899]/30 hover:scale-105 transition-all">
                  Smart Tracking System
                </span>
              </div>
            </div>
          </div>

          {/* Upload Section with 3D effect */}
          <div className="relative">
            <div 
              className="absolute -inset-0.5 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] rounded-xl blur opacity-30 animate-pulse"
              style={{
                filter: "blur(8px)",
                animationDuration: '3s'
              }}
            ></div>
            <div 
              className="relative bg-[#1a103c]/80 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10 hover:shadow-xl transition-all hover:rotate-1 hover:scale-[1.01]"
            >
              <h2 className="text-2xl font-bold text-white mb-6 font-founder-grotesk">Analyze Your Resume</h2>
              <FileUpload />
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a103c] to-[#0a0a1f] z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 font-founder-grotesk tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">
                AI-Powered Features
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-founder-grotesk text-sm md:text-base">
              Our LLM-enhanced resume tracker provides intelligent analysis and powerful tools to optimize your resume and increase your chances of landing your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={null}
              title="AI Resume Analysis"
              description="Our LLM analyzes your resume structure, content, and formatting to ensure ATS compatibility and professional presentation."
            />
            <FeatureCard
              icon={null}
              title="Smart Keyword Extraction"
              description="Advanced NLP algorithms identify key skills and qualifications from job descriptions to help you tailor your resume for each application."
            />
            <FeatureCard
              icon={null}
              title="Real-time LLM Feedback"
              description="Get instant, AI-generated feedback on your resume with detailed scoring and personalized improvement suggestions."
            />
            <FeatureCard
              icon={null}
              title="Semantic Matching"
              description="Our AI goes beyond keyword matching to understand the semantic meaning of your experience and how it aligns with job requirements."
            />
            <FeatureCard
              icon={null}
              title="Comprehensive AI Score"
              description="Receive an intelligent score that evaluates your resume across multiple dimensions with machine learning-based recommendations."
            />
            <FeatureCard
              icon={null}
              title="Intelligent Suggestions"
              description="Get AI-generated, actionable suggestions to improve your resume's content, formatting, and impact for each specific job application."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 font-founder-grotesk tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">
                How Our AI Works
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-founder-grotesk text-sm md:text-base">
              Our advanced LLM process analyzes and optimizes your resume in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: 1,
                title: "Upload Your Resume",
                description: "Upload your resume in PDF, DOCX, or TXT format to our secure AI-powered platform for intelligent parsing.",
                gradient: "from-[#38bdf8] to-[#818cf8]",
                glowEffect: "glow-effect-blue"
              },
              {
                step: 2,
                title: "LLM Processing",
                description: "Our advanced AI analyzes your resume against job descriptions using natural language processing for deep insights.",
                gradient: "from-[#818cf8] to-[#8b5cf6]",
                glowEffect: "glow-effect-purple"
              },
              {
                step: 3,
                title: "AI-Powered Results",
                description: "Receive AI-generated insights, personalized optimization suggestions, and intelligent tracking for your applications.",
                gradient: "from-[#8b5cf6] to-[#ec4899]",
                glowEffect: "glow-effect-pink"
              }
            ].map((step, index) => (
              <div 
                key={step.step} 
                className="relative group"
              >
                <div 
                  className={`absolute -inset-0.5 bg-gradient-to-r ${step.gradient} rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
                ></div>
                <div 
                  className="relative bg-[#1a103c]/80 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10 h-full hover:scale-[1.02] hover:rotate-1 transition-transform"
                >
                  <div 
                    className={`w-16 h-16 bg-${step.gradient.split(" ")[1].replace("to-", "")}/20 rounded-full flex items-center justify-center mx-auto mb-6 ${step.glowEffect} hover:scale-110 transition-transform`}
                  >
                    <span className="text-2xl font-bold text-white font-founder-grotesk">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-founder-grotesk">{step.title}</h3>
                  <p className="text-white/70 font-founder-grotesk">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Features Section */}
      <section id="coming-features" className="py-12 md:py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a103c] to-[#0a0a1f] z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 font-founder-grotesk tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">
                Coming Soon
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-founder-grotesk text-sm md:text-base">
              We're constantly improving ResumeAI with exciting new features to enhance your job search experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* User Login Feature Card */}
            <div className="relative group">
              <div 
                className="absolute -inset-0.5 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
              ></div>
              <div 
                className="relative bg-[#1a103c]/80 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10 h-full flex flex-col hover:scale-[1.02] hover:rotate-1 transition-transform"
              >
                <div className="flex-1">
                  <div className="w-16 h-16 bg-[#38bdf8]/20 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-founder-grotesk">User Dashboard</h3>
                  <p className="text-white/70 font-founder-grotesk mb-6">
                    Create an account and access a personalized dashboard to track your resume analysis history, job applications, and progress over time.
                  </p>
                </div>
                <div className="bg-[#0a0a1f]/50 py-2 px-4 rounded-lg inline-flex items-center mt-auto">
                  <span className="text-xs text-white/50 font-medium font-founder-grotesk">Coming Q4 2023</span>
                </div>
              </div>
            </div>

            {/* Interview AI Feature Card */}
            <div className="relative group">
              <div 
                className="absolute -inset-0.5 bg-gradient-to-r from-[#818cf8] to-[#8b5cf6] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
              ></div>
              <div 
                className="relative bg-[#1a103c]/80 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10 h-full flex flex-col hover:scale-[1.02] hover:rotate-1 transition-transform"
              >
                <div className="flex-1">
                  <div className="w-16 h-16 bg-[#818cf8]/20 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#818cf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-founder-grotesk">Interview AI Coach</h3>
                  <p className="text-white/70 font-founder-grotesk mb-6">
                    Practice interview questions specific to your target roles with our AI Interview Coach. Get instant feedback and tips to improve your responses.
                  </p>
                </div>
                <div className="bg-[#0a0a1f]/50 py-2 px-4 rounded-lg inline-flex items-center mt-auto">
                  <span className="text-xs text-white/50 font-medium font-founder-grotesk">Coming Q1 2024</span>
                </div>
              </div>
            </div>

            {/* Networking Assistant Feature Card */}
            <div className="relative group">
              <div 
                className="absolute -inset-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
              ></div>
              <div 
                className="relative bg-[#1a103c]/80 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10 h-full flex flex-col hover:scale-[1.02] hover:rotate-1 transition-transform"
              >
                <div className="flex-1">
                  <div className="w-16 h-16 bg-[#ec4899]/20 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#ec4899]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-founder-grotesk">Networking Assistant</h3>
                  <p className="text-white/70 font-founder-grotesk mb-6">
                    Generate personalized networking messages and follow-ups based on your target roles and companies to help you stand out and build connections.
                  </p>
                </div>
                <div className="bg-[#0a0a1f]/50 py-2 px-4 rounded-lg inline-flex items-center mt-auto">
                  <span className="text-xs text-white/50 font-medium font-founder-grotesk">Coming Q2 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 font-founder-grotesk tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">
                What Users Say
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-founder-grotesk text-sm md:text-base">
              Discover how ResumeAI has helped job seekers optimize their resumes and land their dream jobs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <TestimonialCard
              quote="ResumeAI's keyword analysis gave me insights I never considered before. My interview callbacks increased by 60% after optimizing with their tool!"
              author="Alex Chen"
              role="Software Engineer"
              rating={5}
            />
            <TestimonialCard
              quote="I was struggling with tailoring my resume for each job application. This AI tool made it so much easier to identify which skills to highlight."
              author="Sarah Johnson"
              role="Marketing Manager"
              rating={5}
            />
            <TestimonialCard
              quote="The intelligent feedback on my resume's structure and content helped me transform a good resume into a great one. Highly recommend!"
              author="Marcus Williams"
              role="Data Analyst"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-10"></div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-white text-2xl font-bold font-founder-grotesk tracking-tight flex items-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">ResumeAI</span>
              </div>
            </div>
            <div className="flex gap-6 md:gap-8">
              <a href="#" className="text-white/50 hover:text-white transition-colors font-founder-grotesk text-sm">Terms</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors font-founder-grotesk text-sm">Privacy</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors font-founder-grotesk text-sm">Support</a>
            </div>
          </div>
          <p className="text-center text-white/40 mt-8 font-founder-grotesk text-xs">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
