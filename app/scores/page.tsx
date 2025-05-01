import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScoreCard } from "@/components/score-card"
import { ScoreTable } from "@/components/score-table"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import { SignUpButton } from "@/components/sign-up-button"
import Script from "next/script"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume Analysis Results - ResumeAI",
  description: "View your personalized resume analysis results. Get insights on keyword matching, experience relevance, and recommendations to improve your resume for ATS systems.",
  openGraph: {
    title: "Resume Analysis Results - ResumeAI",
    description: "View your personalized resume analysis results. Get insights on keyword matching, experience relevance, and recommendations to improve your resume for ATS systems.",
    url: "/scores",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function ScoresPage() {
  // JSON-LD schema for the scores page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Resume Analysis Results - ResumeAI",
    "description": "View your personalized resume analysis results. Get insights on keyword matching, experience relevance, and recommendations to improve your resume for ATS systems.",
    "logo": process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/resume-logo.svg` : "https://resume-ats-tracker.vercel.app/resume-logo.svg",
    "mainEntity": {
      "@type": "Report",
      "name": "Resume ATS Analysis Report",
      "about": {
        "@type": "Thing",
        "name": "Resume Analysis for Blockchain Developer Role"
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

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-white font-founder-grotesk">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>

        <div className="relative group mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-[#1a103c]/80 backdrop-blur-xl rounded-xl p-6 md:p-8 shadow-2xl border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-founder-grotesk tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">
                    ATS Resume Match Evaluation for:
                  </span>{" "}
                  Rust Blockchain Developer Role
                </h1>
                <p className="text-white/50 mt-2 font-founder-grotesk">Analyzed on {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-[#38bdf8] text-black hover:bg-[#38bdf8]/10 font-founder-grotesk"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-[#818cf8] text-black hover:bg-[#818cf8]/10 font-founder-grotesk"
                >
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <ScoreCard title="Final ATS Score" score="88" maxScore="100" color="#8b5cf6" />
              <ScoreCard title="Keywords Match" score="34" maxScore="40" color="#38bdf8" />
              <ScoreCard title="Experience Relevance" score="27" maxScore="30" color="#818cf8" />
              <ScoreCard title="Education & Skills" score="27" maxScore="30" color="#ec4899" />
            </div>

            <div className="space-y-8">
              <ScoreTable
                title="1. Keywords & Technical Skills Match (Weight: 40%)"
                score="34/40"
                description="Strong technical match with Rust, systems, and blockchain-adjacent tech."
                data={[
                  {
                    skill: "Rust",
                    found: true,
                    status: "Yes",
                    comments: "Well-highlighted, strong focus",
                  },
                  {
                    skill: "Blockchain",
                    found: "partial",
                    status: "Partial",
                    comments: "Mentioned via NFT marketplace and smart contracts",
                  },
                  {
                    skill: "Smart Contracts (Rust)",
                    found: true,
                    status: "Yes",
                    comments: "Specifically for Solana, very relevant",
                  },
                  {
                    skill: "Substrate / Cosmos SDK",
                    found: false,
                    status: "No",
                    comments: "Consider mentioning if known",
                  },
                  {
                    skill: "WebAssembly (WASM)",
                    found: false,
                    status: "No",
                    comments: "Useful in blockchain environments",
                  },
                  {
                    skill: "Cryptography (ECDSA, Hashes)",
                    found: "partial",
                    status: "Implicit",
                    comments: "No direct mention, good to elaborate",
                  },
                  {
                    skill: "Peer-to-Peer (P2P) systems",
                    found: true,
                    status: "Yes",
                    comments: "BitTorrent project demonstrates this",
                  },
                  {
                    skill: "Low-latency Systems",
                    found: true,
                    status: "Yes",
                    comments: "Mentioned in context of trading platforms",
                  },
                  {
                    skill: "DevOps / CI/CD / Docker",
                    found: true,
                    status: "Yes",
                    comments: "Covered well under skills",
                  },
                  {
                    skill: "MongoDB / ReactJS",
                    found: true,
                    status: "Yes",
                    comments: "Good complementary stack",
                  },
                  {
                    skill: "Assembly / x86",
                    found: true,
                    status: "Yes",
                    comments: "Bonus for security and perf-critical code",
                  },
                  {
                    skill: "Linux / Bash / Pentesting",
                    found: true,
                    status: "Yes",
                    comments: "Good ops/security skills bonus",
                  },
                ]}
              />

              <ScoreTable
                title="2. Projects & Experience Relevance (Weight: 30%)"
                score="27/30"
                description="Excellent project alignment with blockchain and Rust backend development."
                data={[
                  {
                    skill: "Rust Trading Match Platform",
                    found: true,
                    status: "Yes",
                    comments: "Very strong relevance to trading/blockchain engines",
                  },
                  {
                    skill: "NFT Marketplace with Rust backend",
                    found: true,
                    status: "Yes",
                    comments: "Relevant and production-aligned",
                  },
                  {
                    skill: "BitTorrent (P2P system)",
                    found: true,
                    status: "Yes",
                    comments: "Shows understanding of distributed systems",
                  },
                  {
                    skill: "Web scrapers (LinkedIn, NEET)",
                    found: "partial",
                    status: "Partial",
                    comments: "Less relevant, but shows scraping skills",
                  },
                  {
                    skill: "Work with startups as Founding Engineer",
                    found: true,
                    status: "Yes",
                    comments: "Shows leadership and ownership",
                  },
                  {
                    skill: "Solana Smart Contracts",
                    found: true,
                    status: "Yes",
                    comments: "Blockchain-specific experience",
                  },
                ]}
              />

              <ScoreTable
                title="3. Education & Achievements (Weight: 10%)"
                score="10/10"
                description="Excellent academic foundation."
                data={[
                  {
                    skill: "Engineering Degree (JU)",
                    found: true,
                    status: "Yes",
                    comments: "Well-known institute",
                  },
                  {
                    skill: "IIT/NIT offers via JEE",
                    found: true,
                    status: "Yes",
                    comments: "Competitive achievement",
                  },
                  {
                    skill: "WBJEE Rank (1709)",
                    found: true,
                    status: "Yes",
                    comments: "Adds credibility",
                  },
                ]}
              />

              <ScoreTable
                title="4. Formatting, Clarity & ATS Compatibility (Weight: 10%)"
                score="8/10"
                description="Well-structured, minor improvements in formatting style possible."
                data={[
                  {
                    skill: "PDF/Text readability",
                    found: true,
                    status: "Yes",
                    comments: "Clean and parseable",
                  },
                  {
                    skill: "Keywords present in bullet",
                    found: true,
                    status: "Yes",
                    comments: "Yes",
                  },
                  {
                    skill: "Contact info, LinkedIn, Git",
                    found: true,
                    status: "Yes",
                    comments: "All present",
                  },
                  {
                    skill: "Dates, locations formatted",
                    found: "partial",
                    status: "Partial",
                    comments: 'Slightly inconsistent (e.g. "Jan\'24")',
                  },
                  {
                    skill: "Sections logically ordered",
                    found: true,
                    status: "Yes",
                    comments: "Yes",
                  },
                ]}
              />

              <ScoreTable
                title="5. Soft Skills / Extras (Weight: 10%)"
                score="9/10"
                description="Shows proactive, high-ownership mindset."
                data={[
                  {
                    skill: "Leadership / Tech lead roles",
                    found: true,
                    status: "Yes",
                    comments: "Multiple mentions",
                  },
                  {
                    skill: "Remote collaboration",
                    found: true,
                    status: "Yes",
                    comments: "Demonstrated with multiple teams",
                  },
                  {
                    skill: "Entrepreneurial/startup mindset",
                    found: true,
                    status: "Yes",
                    comments: 'Evident from "Founding Engineer" roles',
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="relative inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium font-founder-grotesk group overflow-hidden"
          >
            <span className="relative z-10 text-white">Analyze Another Resume</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </main>

      <footer className="py-6 md:py-8 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-white/50 font-founder-grotesk text-xs md:text-sm flex items-center justify-center gap-1 md:gap-2">
              © {new Date().getFullYear()} ResumeAI. All rights reserved. Made with
              <span className="text-[#ec4899]">
                ❤️
              </span>
              by rustix69
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
