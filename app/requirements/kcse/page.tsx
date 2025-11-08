"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import THEME from "@/utils/theme";
import {
  FaInfoCircle,
  FaBook,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaDownload,
  FaChevronDown,
  FaChevronUp,
  FaClock,
} from "react-icons/fa";

const { COLORS, FONT, TEXT, BUTTON, CARD } = THEME;

/* -------------------------
   animation helpers
   ------------------------- */
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

/* -------------------------
   small UI components
   ------------------------- */

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

const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="mb-3 rounded-lg overflow-hidden border"
      style={{ borderColor: COLORS.border }}
    >
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full p-4 flex items-center justify-between bg-white"
      >
        <div style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>
          {title}
        </div>
        <div className="text-gray-500">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32 }}
            className="p-4 bg-white text-sm text-gray-700"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* -------------------------
   content
   ------------------------- */

const admissionRequirements = [
  "Copy of Birth Certificate & National ID",
  "Copy of KCPE Certificate/Slip",
  "3 Colored Passport photos",
  "A ream of printing papers (for revision)",
  "1 graph book, 1 geometric set, 10 A4-size exercise books, 1 spring file",
  "Proof of admission (Bank slip or Mobile money receipt)",
  "A smartphone (Computer/Laptop preferred) – for online classes",
];

const coreSubjects = [
  "Mathematics",
  "Biology",
  "Chemistry",
  "CRE/IRE",
  "History",
  "Kiswahili Kitukuzwe",
  "Integrated English",
  "Inventor Business Studies",
];

const setBooksText = [
  "English Literature: Father of Nations (Paul B. Vitta), The Samaritan (John Lara), Parliament of Owls (Adipo Sidang), Artist of the Floating World (Kazuo Ishiguro), and A Silent Song and Other Stories (Godwin Siundu).",
  "Kiswahili Fasihi: Bembea ya Maisha (Dr. Timothy Moriasi), Mapambazuko ya Machweo, Nguu za Jadi (Prof. Clara Momanyi).",
];

/* -------------------------
   page
   ------------------------- */

export default function KcseStyledPage() {
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
              KCSE Programme Admission
            </h1>
            <p className="text-sm md:text-base text-gray-700 max-w-2xl">
              Right Path Schools – School of Continuing Education. A two-year
              programme covering Forms 1–4, fully preparing learners for KCSE.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/join-us"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-md"
                style={{
                  background: BUTTON.primary.backgroundColor,
                  color: BUTTON.primary.textColor,
                }}
              >
                Apply Now
              </a>

              <a
                href="#admission-letter"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  border: `1px solid ${COLORS.primary}`,
                  color: COLORS.primary,
                  background: COLORS.surfaceLight,
                }}
              >
                <FaDownload /> Download Admission Letter
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
                  <FaInfoCircle />
                </div>
                <div>
                  <div className="text-sm font-semibold">Contact</div>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-600">
                <div className="text-xs text-gray-700">+254 758 982 859</div>
                <br />
                <div className="text-xs text-gray-700">
                  8th Flr, Mwalimu Co-op Hse, Tom Mboya Street, Nairobi
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* OVERVIEW */}
      <motion.section {...fade(0.08)} className="mb-10">
        <SectionTitle icon={<FaBook />} title="Overview" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "What you'll study",
              text: "Secondary syllabus over two years (Forms 1–4). Each year has 3 terms with continuous assessments and end-term exams.",
            },
            {
              title: "Modes of study",
              text: "Fulltime, Evening, and Online sessions (live via Google Meet/Zoom). Bridging classes also available.",
            },
            {
              title: "Student support",
              text: "Topical notes, online learning modules, and revision blocks to prepare students for KCSE.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...pop(i * 0.05)}
              className="p-4 rounded-lg"
              style={{
                background: COLORS.surfaceLight,
                boxShadow: `0 8px 20px ${COLORS.shadow}`,
              }}
            >
              <h4
                style={{
                  fontFamily: FONT.medium,
                  color: COLORS.primaryDark,
                }}
              >
                {item.title}
              </h4>
              <p className="text-sm text-gray-700 mt-2">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ADMISSION REQUIREMENTS */}
      <motion.section {...fade(0.12)} className="mb-12">
        <SectionTitle icon={<FaInfoCircle />} title="Admission Requirements" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {admissionRequirements.map((req, i) => (
            <motion.div
              key={i}
              {...pop(i * 0.03)}
              className="p-4 rounded-lg"
              style={{
                background: COLORS.surfaceLight,
                boxShadow: `0 6px 18px ${COLORS.shadow}`,
              }}
            >
              <div className="text-sm text-gray-700">{req}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* COURSE STRUCTURE */}
      <motion.section {...fade(0.16)} className="mb-12">
        <SectionTitle icon={<FaBook />} title="Course Overview & Structure" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            {...pop(0.05)}
            className="p-5 rounded-lg"
            style={{
              background: COLORS.surfaceLight,
              boxShadow: `0 8px 20px ${COLORS.shadow}`,
            }}
          >
            <h4
              style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}
            >
              Two-year Programme
            </h4>
            <ul className="list-disc ml-5 mt-3 text-sm text-gray-700">
              <li>Year 1: Form 1 & 2</li>
              <li>Year 2: Form 3 & 4</li>
              <li>Each year has 3 terms with CATS and final exams</li>
              <li>Assignments and classwork are required</li>
            </ul>
          </motion.div>

          <motion.div
            {...pop(0.1)}
            className="p-5 rounded-lg"
            style={{
              background: COLORS.surfaceLight,
              boxShadow: `0 8px 20px ${COLORS.shadow}`,
            }}
          >
            <h4
              style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}
            >
              Assessment & Exams
            </h4>
            <p className="text-sm text-gray-700 mt-2">
              Students sit for KCSE at the end of Year 2. Internal assessments
              include CATS and term exams. Online self-assessment tests are
              provided in the learning module.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* COURSE BOOKS */}
      <motion.section {...fade(0.2)} className="mb-12">
        <SectionTitle icon={<FaBook />} title="Course Books & Set Books" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            {...pop(0.05)}
            className="p-5 rounded-lg"
            style={{
              background: COLORS.surfaceLight,
              boxShadow: `0 8px 20px ${COLORS.shadow}`,
            }}
          >
            <h4
              style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}
            >
              Core Subjects & Texts
            </h4>
            <ul className="list-disc ml-5 mt-3 text-sm text-gray-700">
              {coreSubjects.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              Learners receive summarized notes and online study materials.
            </p>
          </motion.div>

          <motion.div
            {...pop(0.1)}
            className="p-5 rounded-lg"
            style={{
              background: COLORS.surfaceLight,
              boxShadow: `0 8px 20px ${COLORS.shadow}`,
            }}
          >
            <h4
              style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}
            >
              Set Books
            </h4>
            {setBooksText.map((t, i) => (
              <p className="text-sm text-gray-700 mt-2" key={i}>
                {t}
              </p>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CLASS SCHEDULE */}
      <motion.section {...fade(0.36)} className="mb-12">
        <SectionTitle icon={<FaClock />} title="Class Schedule" />
        <div className="space-y-3">
          {[
            { label: "Early Morning", time: "6:15am – 7:45am" },
            { label: "Day", time: "8:00am – 4:00pm" },
            { label: "Evening", time: "6:00pm – 8:00pm" },
            { label: "Weekend", time: "Sat & Sun 11:00am – 6:00pm" },
            { label: "Online", time: "Flexible / Weekdays & Weekends" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              {...pop(i * 0.03)}
              className="flex items-center gap-4"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: COLORS.gradientPrimary[0] }}
              >
                <span className="text-white font-semibold">{i + 1}</span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: FONT.medium,
                    color: COLORS.primaryDark,
                  }}
                >
                  {s.label}
                </div>
                <div className="text-sm text-gray-700">{s.time}</div>
              </div>
            </motion.div>
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
    </main>
  );
}
