"use client"

import dynamic from 'next/dynamic'
import { PortfolioCard } from "@/components/layout/portfolio-card";
import { PortfolioItems } from "@/data/portfolio";
import { AnimatePresence, motion } from 'motion/react';
import { useState } from "react";
import type { CategoryType } from "@/components/layout/category-filter";

const CategoryFilter = dynamic(
  () => import("@/components/layout/category-filter").then(mod => ({ default: mod.CategoryFilter })),
  { ssr: false }
)

const FloatingShapes = dynamic(
  () => import("@/components/layout/floating-shapes").then(mod => ({ default: mod.FloatingShapes })),
  { ssr: false }
)

const Header = dynamic(
  () => import("@/components/layout/header").then(mod => ({ default: mod.Header })),
  { ssr: false }
)

export default function Page() {

  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const filteredItems = activeCategory === 'all' ? PortfolioItems : PortfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      <FloatingShapes />

      <div className="relative z-10">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-16">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <PortfolioCard
                  key={item.id}
                  {...item}
                  id={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="text-center py-20"
            >
              <motion.div
                className="inline-block px-8 py-4 bg-[#FF1493] text-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
                animate={{
                  rotate: [0, -3, 3, -3, 3, 0]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                該当する作品がありません 😢
              </motion.div>
            </motion.div>
          )}
        </main>
        <footer className="text-center py-12 px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative inline-block"
          >
            <div className="px-6 py-3 bg-black text-white border-4 border-black shadow-[6px_6px_0_0_rgba(255,215,0,1)]">
              © 2025 Portfolio. All rights reserved.
            </div>
          </motion.div>
        </footer>
      </div>
    </div>
  )
}