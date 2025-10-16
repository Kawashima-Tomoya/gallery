"use client"

import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import mojs from '@mojs/core';

export function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const shapes: any[] = [];

    for (let i = 0; i < 8; i++) {
      const shape = new mojs.Shape({
        parent: containerRef.current,
        shape: ['circle', 'polygon', 'rect', 'zigzag'][Math.floor(Math.random() * 4)],
        radius: Math.random() * 30 + 20,
        fill: ['#FF1493', '#FFD700', '#00FFFF', '#FF69B4', '#7B68EE', '#00CED1'][Math.floor(Math.random() * 6)],
        opacity: 0.4,
        x: Math.random() * window.innerWidth,
        y: { [window.innerHeight + 100]: -100 },
        duration: Math.random() * 5000 + 3000,
        repeat: 999,
        delay: Math.random() * 2000,
        easing: 'sin.inOut',
      });
      shapes.push(shape);
    }

    return () => {
      shapes.forEach(shape => shape.pause());
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Big shapes with borders */}
      <motion.div
        className="absolute top-[15%] left-[8%] w-24 h-24 bg-[#FFD700] border-4 border-black"
        animate={{
          y: [0, 40, 0],
          x: [0, 30, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-[25%] right-[12%] w-20 h-20 bg-[#FF1493] border-8 border-t-4 border-black rounded-full"
        animate={{
          y: [0, -50, 0],
          x: [0, -25, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-[60%] left-[15%] w-16 h-16 bg-[#00FFFF] border-4 border-black"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        animate={{
          y: [0, 35, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-[45%] right-[5%] w-24 h-24 bg-[#00CED1] border-4 border-black rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-[35%] left-[25%] w-14 h-14  bg-[#7B68EE] border-4 border-black"
        animate={{
          y: [0, -30, 0],
          rotate: [0, -360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Small decorative dots */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-black rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 40 - 20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Zigzag lines */}
      <motion.div
        className="absolute top-[10%] left-[45%] w-32 h-1 bg-black"
        animate={{
          rotate: [0, 10, -10, 0],
          x: [0, 20, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-[15%] right-[40%] w-24 h-1 bg-black"
        animate={{
          rotate: [0, -10, 10, 0],
          x: [0, -20, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-[35%] right-[70%] w-28 h-1 bg-black rotate-90"
        animate={{
          rotate: [90, 80, 110, 90],
          x: [0, 30, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
   

      {/* Decorative corner elements */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 border-r-8 border-b-8 border-black pointer-events-none"
        initial={{ x: -100, y: -100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      />
      <motion.div
        className="fixed top-0 right-0 w-32 h-32 border-l-8 border-b-8 border-black pointer-events-none"
        initial={{ x: 100, y: -100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      />
      <motion.div
        className="fixed bottom-0 left-0 w-32 h-32 border-r-8 border-t-8 border-black pointer-events-none"
        initial={{ x: -100, y: 100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-32 h-32 border-l-8 border-t-8 border-black pointer-events-none"
        initial={{ x: 100, y: 100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      />
    </div>
  );
}