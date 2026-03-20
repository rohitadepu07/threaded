"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let activeName = items[0].name;
      // Reverse array to find the lowest section that we've scrolled past
      const reversedItems = [...items].reverse();

      for (const item of reversedItems) {
        if (item.url === "#" || item.url === "") continue;
        try {
          const el = document.querySelector(item.url);
          if (el) {
            const rect = el.getBoundingClientRect();
            // If the section top is near or past the top quarter of the viewport
            if (rect.top <= 250) {
              activeName = item.name;
              break;
            }
          }
        } catch (error) {
          // Ignore invalid selectors silently
        }
      }

      // If we're at the very top of the page, enforce the Home (first) tab
      if (window.scrollY < 50) {
        activeName = items[0].name;
      }

      setActiveTab(activeName);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize correctly on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items])

  const handleClick = (item: NavItem) => {
    setActiveTab(item.name)
    setIsOpen(false)

    if (item.url === "#" || item.url === "") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    try {
      const el = document.querySelector(item.url)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block",
          "bg-background/95 backdrop-blur-md shadow-sm border-b border-border",
          className
        )}
      >
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          <button
            onClick={() => {
              setActiveTab(items[0].name);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <img
              src="/android-chrome-512x512.png"
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-primary object-cover"
            />
            <span className="font-display text-xl sm:text-2xl font-bold text-primary tracking-wide flex-shrink-0 hidden sm:block">
              Threaded Design Memories
            </span>
          </button>

          <div className="flex items-center gap-2">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.name

              return (
                <button
                  key={item.name}
                  onClick={() => handleClick(item)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                    "text-foreground/80 hover:text-primary",
                    isActive && "text-primary bg-primary/5"
                  )}
                >
                  <span className="inline">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="tubelight"
                      className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full">
                        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-sm border-b border-border h-16 px-4 flex items-center justify-between">
        <button
          onClick={() => {
            setActiveTab(items[0].name);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img
            src="/android-chrome-512x512.png"
            alt="Logo"
            className="w-10 h-10 rounded-full border border-primary object-cover"
          />
          <span className="font-display text-lg font-bold text-primary tracking-wide">
            Threaded Design Memories
          </span>
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background/90 backdrop-blur-lg border border-border p-2 rounded-md text-foreground/80 hover:text-primary shadow-sm transition-all"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-20 left-4 right-4 z-40 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col py-2">
              {items.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.name

                return (
                  <button
                    key={item.name}
                    onClick={() => handleClick(item)}
                    className={cn(
                      "flex items-center gap-4 px-6 py-4 text-left font-medium transition-colors",
                      isActive
                        ? "text-primary bg-primary/5"
                        : "text-foreground/80 hover:bg-muted/50"
                    )}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
