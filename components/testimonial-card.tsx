import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating: number
}

export function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-[#1a103c]/80 backdrop-blur-xl rounded-xl p-4 md:p-6 shadow-2xl border border-white/10 h-full hover:scale-[1.03] transition-transform hover:rotate-1">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? "text-[#f59e0b] fill-[#f59e0b]" : "text-white/20"}`} />
          ))}
        </div>
        <p className="text-white/70 mb-4 font-founder-grotesk">"{quote}"</p>
        <div>
          <p className="font-bold text-white font-founder-grotesk">{author}</p>
          <p className="text-sm text-white/50 font-founder-grotesk">{role}</p>
        </div>
      </div>
    </div>
  )
}
