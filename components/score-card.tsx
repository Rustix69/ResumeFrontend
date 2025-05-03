interface ScoreCardProps {
  title: string
  score: string
  maxScore: string
  color: string
}

export function ScoreCard({ title, score, maxScore, color }: ScoreCardProps) {
  const percentage = (Number.parseInt(score) / Number.parseInt(maxScore)) * 100

  return (
    <div className="relative group">
      <div
        className="absolute -inset-0.5 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        style={{ background: `linear-gradient(to right, ${color}, ${color}CC)` }}
      ></div>
      <div className="relative bg-[#1a103c]/80 backdrop-blur-xl rounded-xl p-3 md:p-4 shadow-2xl border border-white/10 transform perspective-1000 hover:rotate-y-5 transition-transform duration-500">
        <h3 className="text-xs md:text-sm font-medium text-white/70 mb-1 md:mb-2 font-founder-grotesk truncate">{title}</h3>
        <div className="flex items-end justify-between mb-1 md:mb-2">
          <div className="text-xl md:text-3xl font-bold text-white font-founder-grotesk">{score}</div>
          <div className="text-xs md:text-sm text-white/50 font-founder-grotesk">/{maxScore}</div>
        </div>
        <div className="h-1.5 md:h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(to right, ${color}99, ${color})`,
              boxShadow: `0 0 10px ${color}66`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
