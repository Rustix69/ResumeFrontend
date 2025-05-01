import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface ScoreTableProps {
  title: string
  score: string
  description: string
  data: {
    skill: string
    found: boolean | string
    status: string
    comments: string
  }[]
}

export function ScoreTable({ title, score, description, data }: ScoreTableProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-[#1a103c]/60 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-white/10">
        <div className="flex items-start gap-2 mb-4">
          <CheckCircle className="h-5 w-5 text-[#38bdf8] mt-1" />
          <div>
            <h2 className="text-xl font-bold text-white font-founder-grotesk tracking-tight">{title}</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="py-3 px-4 text-left text-sm font-medium text-white/70 border-b border-white/10 font-founder-grotesk">
                  {title.includes("Keywords") ? "Skill / Keyword" : "Criteria"}
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-white/70 border-b border-white/10 font-founder-grotesk">
                  {title.includes("Keywords") ? "Found in Resume?" : "Status"}
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-white/70 border-b border-white/10 font-founder-grotesk">
                  Comments
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-sm text-white font-founder-grotesk">{item.skill}</td>
                  <td className="py-3 px-4">
                    {item.found === true ? (
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#38bdf8] mr-2" />
                        <span className="text-sm text-white font-founder-grotesk">{item.status}</span>
                      </div>
                    ) : item.found === "partial" ? (
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-[#f59e0b] mr-2" />
                        <span className="text-sm text-white font-founder-grotesk">{item.status}</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <XCircle className="h-5 w-5 text-[#ec4899] mr-2" />
                        <span className="text-sm text-white font-founder-grotesk">{item.status}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-white/70 font-founder-grotesk">{item.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <p className="font-medium text-white font-founder-grotesk flex flex-wrap items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8] inline-block mr-1">
              Score: {score}
            </span>
            <span className="inline-block">— {description}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
