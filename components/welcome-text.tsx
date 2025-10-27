"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import THEME from "@/utils/theme";

const TypingText = ({
  text,
  duration,
  onFinish,
}: {
  text: string;
  duration: number;
  onFinish?: () => void;
}) => {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    setDisplayed("");
    let index = 0;
    let active = true;
    const delay = Math.max(duration / text.length, 40);

    const intervalId = setInterval(() => {
      if (!active) return;
      if (index < text.length) {
        setDisplayed((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
        setTimeout(() => active && onFinish && onFinish(), 1000);
      }
    }, delay);

    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, [text, duration, onFinish]);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  const gradientColors =
    THEME.COLORS.gradientPrimary && THEME.COLORS.gradientPrimary.length > 1
      ? THEME.COLORS.gradientPrimary.join(",")
      : `${THEME.COLORS.primary}, ${THEME.COLORS.secondary}, ${THEME.COLORS.accent}`;

  return (
    <motion.div
      className="flex justify-center items-center overflow-hidden w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* ✨ Subtle animated sweep overlay (not a mask anymore) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${THEME.COLORS.primary}33 40%, ${THEME.COLORS.accent}33 60%, transparent 100%)`,
          opacity: 0.5,
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Typing text itself */}
      <div className="relative flex flex-row items-center whitespace-nowrap text-3xl sm:text-4xl font-bold z-10">
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(90deg, ${gradientColors})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: THEME.FONT.bold,
          }}
        >
          {displayed}
        </span>
        <span
          className={`ml-1 h-8 w-0.5 transition-opacity duration-150 ${
            cursorVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: THEME.COLORS.primary }}
        />
      </div>
    </motion.div>
  );
};

export default function WelcomeTyping() {
  const texts = [
    "Right Path Schools",
    "Centre for Adults",
    "and Private Candidates",
  ];

  const [step, setStep] = useState(0);

  const handleFinish = () => {
    setTimeout(() => setStep((prev) => (prev + 1) % texts.length), 1000);
  };

  return (
    <div className="w-full flex justify-center items-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={texts[step]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <TypingText text={texts[step]} duration={2500} onFinish={handleFinish} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
