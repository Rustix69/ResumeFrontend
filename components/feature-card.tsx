import type React from "react"

interface FeatureCardProps {
  icon?: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38bdf8]/40 to-[#818cf8]/40 rounded-xl blur opacity-20 group-hover:opacity-100 transition duration-700 group-hover:duration-300"></div>
      <div className="relative bg-[#1a103c]/80 backdrop-blur-xl rounded-xl p-6 md:p-8 shadow-2xl border border-white/10 h-full hover:scale-[1.02] hover:border-white/20 transition-all">
        {icon && <div className="mb-6">{icon}</div>}
        <h3 className="text-xl font-bold text-white mb-3 font-founder-grotesk">{title}</h3>
        <p className="text-white/70 font-founder-grotesk leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
