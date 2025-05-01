import { Star } from "lucide-react"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating: number
}

export function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-xllur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <motion.div 
        className="relative bg-[#1a103c]/80 backdrop-blur-xl rounded-xl p-4 md:p-6 shadow-2xl border border-white/10 h-full"
        whileHover={{ 
          rotateY: 5, 
          scale: 1.03,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        <motion.div 
          className="flex mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? "text-[#f59e0b] fill-[#f59e0b]" : "text-white/20"}`} />
          ))}
        </motion.div>
        <motion.p 
          className="text-white/70 mb-4 font-founder-grotesk"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >"{quote}"</motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="font-bold text-white font-founder-grotesk">{author}</p>
          <p className="text-sm text-white/50 font-founder-grotesk">{role}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
