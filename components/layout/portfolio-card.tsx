"use client"

import { motion } from "motion/react";
import { ExternalLink, Play, Zap, Star } from "lucide-react";
import { ImageFallback } from "@/components/ui/image-fallback";
import { useRef, useState } from "react";
import { PortfolioItem } from "@/data/portfolio";

const categoryColors = {
  website: "#00CED1",
  design: "#FF1493",
  video: "#FFD220",
};

export function PortfolioCard({
  id,
  title,
  description,
  image,
  category,
  tags,
  link,
}: PortfolioItem) {
  const [rotation] = useState(
    Math.random() * 6 - 3,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotate: -10 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
      transition={{
        duration: 0.6,
        delay: id * 0.08,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -20,
        rotate: 0,
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      className="group relative bg-white overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black cursor-pointer"
      role="article"
>
      {/* Image container */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-64 overflow-hidden border-b-4 border-black bg-gray-100 block"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <ImageFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Category badge */}
        <motion.div
          className="text-white absolute top-4 right-4 px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
          style={{
            backgroundColor:
              categoryColors[category as keyof typeof categoryColors] ||
              "#9333EA",
            textShadow: "2px 2px 1px rgba(0, 0, 0, 0.5)",
          }}
          transition={{ duration: 0.5 }}
        >
          {category === "website" && "💻 Web"}
          {category === "design" && "🎨 Design"}
          {category === "video" && "🎬 Video"}
        </motion.div>

        {/* Video play button for video category */}
        {category === "video" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-[#FFD700] border-4 border-black rounded-full p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
              whileHover={{
                scale: 1.3,
                rotate: [0, -10, 10, -10, 10, 0],
              }}
              whileTap={{ scale: 0.8 }}
            >
              <Play
                className="w-16 h-16 text-black"
                fill="currentColor"
              />
            </motion.div>
          </motion.div>
        )}
      </a>

      {/* Content */}
      <div className="p-6 bg-white">
        <motion.h3
          className="mb-3 text-black drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
          whileHover={{ x: 10, scale: 1.05 }}
        >
          {title}
        </motion.h3>

        <p className="text-gray-700 mb-4">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 bg-black text-white border-2 border-black"
              whileHover={{
                scale: 1.15,
                backgroundColor:
                  categoryColors[
                    category as keyof typeof categoryColors
                  ] || "#9333EA",
                color: "#000000",
                rotate: Math.random() * 20 - 10,
              }}
              transition={{ duration: 0.2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Link button */}
        {link && (
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white border-2 border-black shadow-[4px_4px_0_0_rgba(255,215,0,1)]"
            whileHover={{
              x: 8,
              y: -4,
              boxShadow: "6px 6px 0 0 rgba(255,215,0,1)",
            }}
            whileTap={{
              boxShadow: "2px 2px 0 0 rgba(255,215,0,1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            サイトへ移動
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        )}
      </div>

      {/* Decorative dots */}
      <div className="absolute -top-3 -left-3 w-6 h-6 bg-black rounded-full border-2 border-black" />
      <div className="absolute -top-3 -right-3 w-6 h-6 bg-black rounded-full border-2 border-black" />
      <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-black rounded-full border-2 border-black" />
      <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-black rounded-full border-2 border-black" />
    </motion.div>
  );
}