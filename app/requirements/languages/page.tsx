"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import THEME from "@/utils/theme";
import {
  FaGlobe,
  FaBookOpen,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import Link from "next/link";

const { COLORS, FONT, TEXT, BUTTON, CARD } = THEME;

/* ---------------------------
   Anim helpers
   --------------------------- */
const fade = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay: d },
  viewport: { once: true, amount: 0.2 },
});
const pop = (d = 0) => ({
  initial: { opacity: 0, scale: 0.98 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.45, delay: d },
  viewport: { once: true },
});

/* ---------------------------
   Small components
   --------------------------- */
const SectionTitle: React.FC<{ icon?: React.ReactNode; title: string }> = ({
  icon,
  title,
}) => (
  <div className="flex items-center gap-3 mb-4">
    {icon && (
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.secondaryDark})`,
        }}
        className="p-2 rounded-lg text-white shadow-sm"
      >
        {icon}
      </div>
    )}
    <h2
      style={{ fontFamily: FONT.semiBold, color: COLORS.primaryDark }}
      className="text-xl md:text-2xl"
    >
      {title}
    </h2>
  </div>
);

const ExpandCard: React.FC<{
  title: string;
  subtitle?: string;
  details?: Record<string, string>;
}> = ({ title, subtitle, details = {} }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="bg-white border"
      style={{
        borderColor: COLORS.border,
        borderRadius: CARD.default.borderRadius,
      }}
    >
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full p-4 flex items-start justify-between text-left"
      >
        <div className="max-w-[70%]">
          <div
            style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}
            className="text-lg"
          >
            {title}
          </div>
          {subtitle && (
            <div className="text-sm text-gray-600 mt-1">{subtitle}</div>
          )}
        </div>
        <div className="text-gray-500">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32 }}
            className="px-4 pb-4"
          >
            <div className="grid gap-2 text-sm text-gray-700">
              {Object.entries(details).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="font-medium text-gray-800">{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FlipCard: React.FC<{
  title: string;
  meta: string;
  details: string;
}> = ({ title, meta, details }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped((s) => !s)}
      className="w-full h-44 cursor-pointer perspective"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 p-4 rounded-lg flex flex-col justify-between"
          style={{
            background: `linear-gradient(135deg, ${COLORS.gradientPrimary[0]}, ${COLORS.gradientPrimary[1]})`,
            color: COLORS.textLight,
            backfaceVisibility: "hidden",
            borderRadius: CARD.default.borderRadius,
            boxShadow: `0 8px 24px ${COLORS.shadow}`,
          }}
        >
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs">{meta}</div>
        </div>

        <div
          className="absolute inset-0 p-4 rounded-lg"
          style={{
            background: COLORS.surfaceLight,
            color: COLORS.textDark,
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            borderRadius: CARD.default.borderRadius,
            boxShadow: `0 8px 24px ${COLORS.shadow}`,
          }}
        >
          <div className="text-sm font-medium mb-2">{title}</div>
          <div className="text-xs text-gray-700">{details}</div>
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------------------
   Data
   --------------------------- */
const languages = [
  {
    title: "French (Français)",
    flag: "🇫🇷",
    duration: "3–6 months per level",
    levels: "Basic → Intermediate → Advanced → Diploma",
    exam: "JP-UK",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "German (Deutsch)",
    flag: "🇩🇪",
    duration: "3–6 months per level",
    levels: "Basic → Intermediate → Advanced → Diploma",
    exam: "JP-UK",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "Chinese (中文)",
    flag: "🇨🇳",
    duration: "3–6 months per level",
    levels: "Basic → Intermediate → Advanced → Diploma",
    exam: "JP-UK",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "Spanish (Español)",
    flag: "🇪🇸",
    duration: "3–6 months per level",
    levels: "Basic → Intermediate → Advanced → Diploma",
    exam: "JP-UK",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "English (IELTS / TOEFL Prep)",
    flag: "🇬🇧",
    duration: "3–6 months",
    levels: "Intermediate → Advanced",
    exam: "British Council / Internal",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "Kiswahili",
    flag: "🇰🇪",
    duration: "3 months",
    levels: "Basic → Advanced",
    exam: "KNEC",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "Public Speaking & Communication",
    flag: "🗣️",
    duration: "3 months",
    levels: "Certificate",
    exam: "ICM",
    intake: "Every term",
    entry: "Open",
  },
];

const shortPrograms = [
  {
    title: "Conversational French (Crash)",
    meta: "4 weeks",
    details:
      "Pronunciation, basic phrases, survival French for travel and everyday life.",
  },
  {
    title: "Business English & Professional Writing",
    meta: "6 weeks",
    details:
      "Emails, reports, presentations, and interview preparation techniques.",
  },
  {
    title: "TOEFL / IELTS Booster",
    meta: "8 weeks",
    details:
      "Exam strategy, mock tests, and band improvement techniques for success.",
  },
  {
    title: "Chinese (HSK Basics)",
    meta: "6 weeks",
    details:
      "Pinyin, basic characters, sentence structure, and conversation basics.",
  },
  {
    title: "Spanish for Travelers",
    meta: "3 weeks",
    details:
      "Essential phrases, pronunciation, and cultural orientation for travel.",
  },
  {
    title: "Public Speaking Mini-Clinic",
    meta: "2 weeks",
    details:
      "Confidence building, voice control, and speech delivery techniques.",
  },
];

/* ---------------------------
   Page
   --------------------------- */
export default function LanguagesPage() {
  return (
    <main
      className="min-h-screen px-6 md:px-16 py-12"
      style={{
        fontFamily: FONT.regular,
        background: `linear-gradient(135deg, ${COLORS.gradientBackground.join(
          ", "
        )})`,
        color: COLORS.textDark,
      }}
    >
      {/* HERO */}
      <motion.header
        {...fade(0)}
        className="rounded-lg p-8 md:p-12 mb-8"
        style={{
          background: `linear-gradient(90deg, ${COLORS.gradientPrimary[0]}20, ${COLORS.gradientPrimary[1]}10)`,
          borderRadius: CARD.default.borderRadius,
        }}
      >
        <div className="md:flex md:items-center md:justify-between gap-6">
          <div>
            <h1
              style={{ ...TEXT.h1, color: COLORS.primaryDark }}
              className="mb-2"
            >
              School of International Languages
            </h1>
            <p className="text-sm md:text-base text-gray-700 max-w-2xl">
              Connecting the world through communication — practical language
              training for travel, work, and international exams.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/join-us"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-md"
                style={{
                  background: BUTTON.primary.backgroundColor,
                  color: BUTTON.primary.textColor,
                }}
              >
                Enroll Now
              </Link>

              <a
                href="#prospectus"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  border: `1px solid ${COLORS.primary}`,
                  color: COLORS.primary,
                  background: COLORS.surfaceLight,
                }}
              >
                <FaBookOpen /> View Prospectus
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:w-1/3">
            <div
              className="p-4 rounded-lg"
              style={{
                background: COLORS.surfaceLight,
                boxShadow: `0 10px 30px ${COLORS.shadow}`,
                borderRadius: CARD.default.borderRadius,
              }}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl" style={{ color: COLORS.primary }}>
                  <FaGlobe />
                </div>
                <div>
                  <div className="text-sm font-semibold">Contact</div>
                  <div className="text-xs text-gray-700">
                    righttrackschools2025@gmail.com
                  </div>
                  <div className="text-xs text-gray-600">
                    8th Flr, Mwalimu Co-op House, Tom Mboya Street, Nairobi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* OVERVIEW */}
      <motion.section {...fade(0.08)} className="mb-10">
        <SectionTitle icon={<FaBookOpen />} title="Overview" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            {...pop(0.05)}
            className="p-4 rounded-lg"
            style={{
              background: COLORS.surfaceLight,
              boxShadow: `0 8px 20px ${COLORS.shadow}`,
            }}
          >
            <h4
              style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}
            >
              Vision
            </h4>
            <p className="text-sm text-gray-700 mt-2">
              To nurture global citizens equipped with language proficiency and
              cultural understanding.
            </p>
          </motion.div>

          <motion.div
            {...pop(0.1)}
            className="p-4 rounded-lg"
            style={{
              background: COLORS.surfaceLight,
              boxShadow: `0 8px 20px ${COLORS.shadow}`,
            }}
          >
            <h4
              style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}
            >
              Mission
            </h4>
            <p className="text-sm text-gray-700 mt-2">
              To provide practical language training that enhances
              international communication, travel, and career growth.
            </p>
          </motion.div>

          <motion.div
            {...pop(0.15)}
            className="p-4 rounded-lg"
            style={{
              background: COLORS.surfaceLight,
              boxShadow: `0 8px 20px ${COLORS.shadow}`,
            }}
          >
            <h4
              style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}
            >
              Accreditation
            </h4>
            <p className="text-sm text-gray-700 mt-2">
              Approved by KNEC, ICM, JP-UK and recognized by international
              partners.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* LANGUAGE PROGRAMS */}
      <motion.section {...fade(0.12)} className="mb-12">
        <SectionTitle icon={<FaUsers />} title="Language Programs" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((l, i) => (
            <motion.div key={l.title} {...pop(i * 0.05)}>
              <ExpandCard
                title={`${l.flag} ${l.title}`}
                subtitle={`${l.duration} • ${l.levels}`}
                details={{
                  Levels: l.levels,
                  "Exam Body": l.exam,
                  Intake: l.intake,
                  Entry: l.entry,
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SHORT PROGRAMS */}
      <motion.section {...fade(0.2)} className="mb-12">
        <SectionTitle icon={<FaBookOpen />} title="Short Programs & Boosters" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shortPrograms.map((p, i) => (
            <div key={p.title} className="h-44">
              <FlipCard
                title={p.title}
                meta={p.meta}
                details={p.details}
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* TUITION INFO CARD */}
      <motion.section {...fade(0.4)}>
        <div
          className="p-6 rounded-xl flex items-center gap-4 justify-between"
          style={{
            background: COLORS.surfaceLight,
            boxShadow: `0 8px 20px ${COLORS.shadow}`,
            borderRadius: CARD.default.borderRadius,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-full"
              style={{
                background: `${COLORS.primary}15`,
                color: COLORS.primary,
              }}
            >
              <FaInfoCircle size={22} />
            </div>

            <div>
              <div
                style={{
                  fontFamily: FONT.medium,
                  color: COLORS.primaryDark,
                }}
              >
                Tuition Info
              </div>
              <div className="text-sm text-gray-600">
                Available upon request
              </div>
            </div>
          </div>

          <a
            href="/contact"
            className="px-4 py-2 rounded-lg text-sm shadow-sm"
            style={{
              background: BUTTON.primary.backgroundColor,
              color: BUTTON.primary.textColor,
            }}
          >
            Request Info
          </a>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.div {...fade(0.24)} className="text-center mt-12">
        <a
          href="/join-us"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg shadow-md"
          style={{
            background: BUTTON.primary.backgroundColor,
            color: BUTTON.primary.textColor,
          }}
        >
          Apply Now
        </a>
      </motion.div>
    </main>
  );
}
