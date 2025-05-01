"use client"

import Link from "next/link"

export function SignUpButton() {
  return (
    <Link
      href="/#"
      className="relative inline-flex h-10 items-center justify-center rounded-md border border-[#38bdf8] bg-transparent px-8 text-sm font-medium text-white hover:bg-[#38bdf8]/10 transition-colors font-founder-grotesk group overflow-hidden"
      onClick={(e) => {
        e.preventDefault();
        alert("User Based Resume dashboard soon");
      }}
    >
      <span className="relative z-10">Sign up</span>
      <div className="absolute inset-0 h-full w-full translate-y-full bg-gradient-to-t from-[#38bdf8] to-[#818cf8] opacity-30 transition-transform duration-300 group-hover:translate-y-0"></div>
    </Link>
  )
} 