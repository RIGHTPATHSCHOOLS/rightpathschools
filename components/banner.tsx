"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import THEME from "@/utils/theme";

const slides = [
  {
    image: "/banner/img1.png",
    title: "Welcome to Right Path Schools",
    subtitle: "Center for Adults and Private Candidates.",
  },
  {
    image: "/banner/img2.png",
    title: "ICT and Digital Excellence",
    subtitle:
      "Integrating modern technology into learning — preparing our students for a connected world.",
  },
  {
    image: "/banner/img3.png",
    title: "State-of-the-Art Science Laboratories",
    subtitle:
      "Equipped for all science practicals — inspiring innovation, discovery, and hands-on learning.",
  },
  {
    image: "/banner/img4.png",
    title: "Language and Communication Mastery",
    subtitle:
      "Study Kiswahili, English, and foreign languages like French — building confident global communicators.",
  },
  {
    image: "/banner/img5.png",
    title: "High-Quality Online Classes",
    subtitle:
      "Learn anywhere, anytime — interactive virtual lessons that maintain our classroom excellence.",
  },
  {
    image: "/banner/img6.png",
    title: "IGCSE and International Curriculum",
    subtitle:
      "Providing globally recognized education — shaping students to thrive in a competitive world.",
  },
];

const HeroBanner: React.FC = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[50vh] sm:h-[40vh] md:h-[55vh] lg:h-[60vh] overflow-hidden">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === current ? (
            <motion.div
              key={index + slide.image} // ensures unique re-render for all 6
              className="absolute top-0 left-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover transition-transform duration-1000 ease-in-out scale-105 hover:scale-100"
              />

              {/* Overlay gradient (theme-based) */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${THEME.COLORS.primaryDark}99, ${THEME.COLORS.secondaryDark}99)`,
                }}
              ></div>

              {/* Overlay fade for text clarity */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Text Overlay */}
              <motion.div
                className="absolute bottom-16 left-8 sm:left-12 md:left-20 max-w-xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                <h1
                  className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg"
                  style={{
                    color: THEME.COLORS.accent,
                    fontFamily: THEME.FONT.bold,
                  }}
                >
                  {slide.title}
                </h1>
                <p
                  className="text-sm sm:text-lg md:text-xl font-light text-white leading-snug drop-shadow-md"
                  style={{ fontFamily: THEME.FONT.regular }}
                >
                  {slide.subtitle}
                </p>

                {/* Themed accent line */}
                <div
                  className="mt-4 h-1 w-24 rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${THEME.COLORS.primary}, ${THEME.COLORS.secondary})`,
                  }}
                ></div>
              </motion.div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-white w-8 shadow-md"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
