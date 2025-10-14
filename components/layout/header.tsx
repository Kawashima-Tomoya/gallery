import { motion } from 'motion/react';
import { Sparkles, Star, Heart, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import mojs from '@mojs/core';

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const burstRef = useRef<any>(null);

  useEffect(() => {
    if (headerRef.current) {
      burstRef.current = new mojs.Burst({
        parent: headerRef.current,
        radius: { 50: 150 },
        count: 15,
        children: {
          shape: ['circle', 'polygon', 'zigzag'],
          radius: { 10: 0 },
          fill: ['#FFD700', '#FF1493', '#00FFFF', '#FF69B4', '#7B68EE'],
          duration: 2000,
          delay: 'stagger(0, 100)',
        }
      });

      const interval = setInterval(() => {
        if (burstRef.current && headerRef.current) {
          const rect = headerRef.current.getBoundingClientRect();
          burstRef.current
            .tune({
              x: Math.random() * rect.width,
              y: Math.random() * rect.height,
            })
            .replay();
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100, rotate: -2 }}
      animate={{ y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative overflow-hidden bg-[#FF1493] py-16 px-6 border-b-8 border-black"
    >
      <div className="max-w-6xl mx-auto text-center relative z-10">        
        <motion.h1
          className="text-2xl text-white mb-4 drop-shadow-[4px_4px_0_rgba(0,0,0,0.6)]"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          作品集
        </motion.h1>
        
        <motion.p
          className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          訓練校で作成した、「Webサイト・デザイン・動画」の制作物をまとめました
        </motion.p>
      </div>
      
      {/* Floating shapes */}
      <motion.div
        className="absolute top-10 left-[5%] w-24 h-24 bg-fire-red rounded-full border-4 border-black"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-20 right-[5%] w-20 h-20 border-8 border-black"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        animate={{
          y: [0, 30, 0],
          rotate: [0, -360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-10 left-[15%] w-16 h-16 bg-[#7B68EE] border-4 border-black"
        animate={{
          rotate: [0, 180, 0],
          x: [0, 20, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-16 right-[20%] w-20 h-20 bg-fire-blue rounded-full border-4 border-black"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.header>
  );
}
