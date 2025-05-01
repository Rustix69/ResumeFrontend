"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  
  const menuItems = ["Features", "How It Works", "Coming Features", "Testimonials"]
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-gradient-to-br from-[#0a0a1f] via-[#1a103c] to-[#2d1b4e] z-50 flex flex-col p-6"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Close button */}
            <div className="flex justify-end">
              <button 
                className="p-2 text-white"
                onClick={onClose}
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Menu links */}
            <div className="flex flex-col gap-6 mt-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link 
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} 
                    className="text-white/90 hover:text-white text-xl font-founder-grotesk block py-2"
                    onClick={onClose}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Sign up button */}
            <div className="mt-auto py-4">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("User Based Resume dashboard soon");
                  onClose();
                }}
                className="relative inline-flex h-12 w-full items-center justify-center rounded-md border border-[#38bdf8] bg-transparent px-8 text-base font-medium text-white hover:bg-[#38bdf8]/10 transition-colors font-founder-grotesk group overflow-hidden"
              >
                <span className="relative z-10">Sign up</span>
                <div className="absolute inset-0 h-full w-full translate-y-full bg-gradient-to-t from-[#38bdf8] to-[#818cf8] opacity-30 transition-transform duration-300 group-hover:translate-y-0"></div>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 