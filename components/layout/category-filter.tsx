import { motion } from 'motion/react';
import { Monitor, Palette, Video, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import mojs from '@mojs/core';

export type CategoryType = 'all' | 'website' | 'design' | 'video';

interface CategoryFilterProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const categories = [
  { id: 'all' as const, label: 'すべて', icon: Sparkles, color: '#9333EA' },
  { id: 'website' as const, label: 'Webサイト', icon: Monitor, color: '#00CED1' },
  { id: 'design' as const, label: 'デザイン', icon: Palette, color: '#FF1493' },
  { id: 'video' as const, label: '動画', icon: Video, color: '#FFD700' },
];

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const burstsRef = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    categories.forEach((category) => {
      const button = buttonRefs.current[category.id];
      if (button) {
        burstsRef.current[category.id] = new mojs.Burst({
          parent: button,
          radius: { 0: 80 },
          count: 12,
          children: {
            shape: ['circle', 'polygon', 'zigzag'],
            radius: { 8: 0 },
            fill: category.color,
            duration: 1000,
          }
        });
      }
    });
  }, []);

  const handleClick = (categoryId: CategoryType) => {
    if (burstsRef.current[categoryId]) {
      burstsRef.current[categoryId].replay();
    }
    onCategoryChange(categoryId);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 mb-16">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        
        return (
          <motion.button
            key={category.id}
            ref={(el) => (buttonRefs.current[category.id] = el)}
            onClick={() => handleClick(category.id)}
            className="relative px-8 py-4 text-white overflow-visible border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
            style={{ 
              backgroundColor: category.color,
              transform: isActive ? 'rotate(-2deg)' : 'rotate(0deg)'
            }}
            whileHover={{ 
              scale: 1.15,
              rotate: Math.random() * 20 - 10,
              y: -10,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              rotate: Math.random() * 40 - 20,
            }}
            animate={isActive ? {
              y: [0, -8, 0],
              rotate: [-2, 2, -2],
            } : {}}
            transition={{
              y: {
                duration: 1,
                repeat: isActive ? Infinity : 0,
              },
              rotate: {
                duration: 2,
                repeat: isActive ? Infinity : 0,
              }
            }}
          >
            <span className="flex items-center gap-3 relative z-10 drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
              <motion.div
                animate={isActive ? {
                  rotate: [0, 360]
                } : {}}
                transition={{
                  duration: 3,
                  repeat: isActive ? Infinity : 0,
                  ease: "linear"
                }}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
              {category.label}
            </span>
            
            {isActive && (
              <>
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-black rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-black rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                />
              </>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
