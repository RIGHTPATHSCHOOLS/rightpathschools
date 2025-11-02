// app/languages/page.tsx
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
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaDownload,
  FaClock,
  FaMoneyCheckAlt,
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
const SectionTitle: React.FC<{ icon?: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-4">
    {icon && (
      <div
        style={{ background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.secondaryDark})` }}
        className="p-2 rounded-lg text-white shadow-sm"
      >
        {icon}
      </div>
    )}
    <h2 style={{ fontFamily: FONT.semiBold, color: COLORS.primaryDark }} className="text-xl md:text-2xl">
      {title}
    </h2>
  </div>
);

/* Expandable card (used for language details) */
const ExpandCard: React.FC<{
  title: string;
  subtitle?: string;
  details?: Record<string, string>;
}> = ({ title, subtitle, details = {} }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="bg-white border" style={{ borderColor: COLORS.border, borderRadius: CARD.default.borderRadius }}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full p-4 flex items-start justify-between text-left"
      >
        <div className="max-w-[70%]">
          <div style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }} className="text-lg">
            {title}
          </div>
          {subtitle && <div className="text-sm text-gray-600 mt-1">{subtitle}</div>}
        </div>
        <div className="text-gray-500">{open ? <FaChevronUp /> : <FaChevronDown />}</div>
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

/* Accordion for admission/fees */
const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3 rounded-lg overflow-hidden border" style={{ borderColor: COLORS.border }}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full p-4 flex items-center justify-between bg-white"
      >
        <div style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>{title}</div>
        <div className="text-gray-500">{open ? <FaChevronUp /> : <FaChevronDown />}</div>
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

/* FlipCard for specialised programs */
const FlipCard: React.FC<{ title: string; meta: string; details: string }> = ({ title, meta, details }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onClick={() => setFlipped((s) => !s)} className="w-full h-44 cursor-pointer perspective">
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
    fee: "Ksh 15,000 / term",
    exam: "JP-UK",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "German (Deutsch)",
    flag: "🇩🇪",
    duration: "3–6 months per level",
    levels: "Basic → Intermediate → Advanced → Diploma",
    fee: "Ksh 15,000 / term",
    exam: "JP-UK",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "Chinese (中文)",
    flag: "🇨🇳",
    duration: "3–6 months per level",
    levels: "Basic → Intermediate → Advanced → Diploma",
    fee: "Ksh 15,000 / term",
    exam: "JP-UK",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "Spanish (Español)",
    flag: "🇪🇸",
    duration: "3–6 months per level",
    levels: "Basic → Intermediate → Advanced → Diploma",
    fee: "Ksh 15,000 / term",
    exam: "JP-UK",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "English (IELTS / TOEFL Prep)",
    flag: "🇬🇧",
    duration: "3–6 months",
    levels: "Intermediate → Advanced",
    fee: "Ksh 15,000 / term",
    exam: "British Council / Internal",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "Kiswahili",
    flag: "🇰🇪",
    duration: "3 months",
    levels: "Basic → Advanced",
    fee: "Ksh 10,000 / term",
    exam: "KNEC",
    intake: "Every term",
    entry: "Open",
  },
  {
    title: "Public Speaking & Communication",
    flag: "🗣️",
    duration: "3 months",
    levels: "Certificate",
    fee: "Ksh 10,000 / term",
    exam: "ICM",
    intake: "Every term",
    entry: "Open",
  },
];

const shortPrograms = [
  { title: "Conversational French (Crash)", meta: "4 weeks • Ksh 6,000", details: "Pronunciation, basic phrases, survival French for travel." },
  { title: "Business English & Professional Writing", meta: "6 weeks • Ksh 8,000", details: "Emails, reports, presentations, and interview prep." },
  { title: "TOEFL / IELTS Booster", meta: "8 weeks • Ksh 12,000", details: "Exam technique, mock tests, and band improvement strategies." },
  { title: "Chinese (HSK basics)", meta: "6 weeks • Ksh 8,000", details: "Pinyin, basic characters and everyday conversation." },
  { title: "Spanish for Travelers", meta: "3 weeks • Ksh 5,000", details: "Essential phrases, pronunciation, and cultural tips." },
  { title: "Public Speaking Mini-Clinic", meta: "2 weeks • Ksh 5,000", details: "Confidence building, speech structuring and delivery." },
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
        background: `linear-gradient(135deg, ${COLORS.gradientBackground.join(", ")})`,
        color: COLORS.textDark,
      }}
    >
      {/* HERO */}
      <motion.header {...fade(0)} className="rounded-lg p-8 md:p-12 mb-8" style={{
        background: `linear-gradient(90deg, ${COLORS.gradientPrimary[0]}20, ${COLORS.gradientPrimary[1]}10)`,
        borderRadius: CARD.default.borderRadius,
      }}>
        <div className="md:flex md:items-center md:justify-between gap-6">
          <div>
            <h1 style={{ ...TEXT.h1, color: COLORS.primaryDark }} className="mb-2">School of International Languages</h1>
            <p className="text-sm md:text-base text-gray-700 max-w-2xl">
              Connecting the world through communication — practical language training for travel, work and international exams.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/join-us"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-md"
                style={{ background: BUTTON.primary.backgroundColor, color: BUTTON.primary.textColor }}
              >
                Enroll Now
              </Link>

              <a
                href="#prospectus"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{ border: `1px solid ${COLORS.primary}`, color: COLORS.primary, background: COLORS.surfaceLight }}
              >
                <FaDownload /> View Prospectus
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:w-1/3">
            <div className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 10px 30px ${COLORS.shadow}`, borderRadius: CARD.default.borderRadius }}>
              <div className="flex items-start gap-3">
                <div className="text-3xl" style={{ color: COLORS.primary }}><FaGlobe /></div>
                <div>
                  <div className="text-sm font-semibold">Contact</div>
                  <div className="text-xs text-gray-700">+254 758 982 859</div>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-600">
                <div className="text-xs text-gray-700">righttrackschools2025@gmail.com</div>
                 <br />
                8th Flr, Mwalimu Co-op House, Tom Mboya Street, Nairobi
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Overview */}
      <motion.section {...fade(0.08)} className="mb-10">
        <SectionTitle icon={<FaBookOpen />} title="Overview" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div {...pop(0.05)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Vision</h4>
            <p className="text-sm text-gray-700 mt-2">To nurture global citizens equipped with language proficiency and cultural understanding.</p>
          </motion.div>

          <motion.div {...pop(0.1)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Mission</h4>
            <p className="text-sm text-gray-700 mt-2">To provide practical language training that enhances international communication, travel, and career growth.</p>
          </motion.div>

          <motion.div {...pop(0.15)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Accreditation</h4>
            <p className="text-sm text-gray-700 mt-2">Approved by KNEC, ICM, JP-UK and recognized by international partners.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Language Programs (expandable) */}
      <motion.section {...fade(0.12)} className="mb-12">
        <SectionTitle icon={<FaUsers />} title="Language Programs" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((l) => (
            <motion.div key={l.title} {...pop(0.05)}>
              <ExpandCard
                title={`${l.flag} ${l.title}`}
                subtitle={`${l.duration} • ${l.levels ?? l.levels}`}
                details={{
                  "Levels": l.levels,
                  "Fee": l.fee,
                  "Exam Body": l.exam,
                  "Intake": l.intake,
                  "Entry": l.entry,
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Course Levels timeline */}
      <motion.section {...fade(0.16)} className="mb-12">
        <SectionTitle icon={<FaClock />} title="Course Levels & What You'll Learn" />
        <div className="space-y-4">
          {[
            {
              level: "Basic",
              desc: "Vocabulary, pronunciation, grammar foundations, essential phrases and listening practice."
            },
            {
              level: "Intermediate",
              desc: "Conversational fluency, structured writing, reading comprehension and role-play."
            },
            {
              level: "Advanced",
              desc: "Business communication, translation basics, public speaking and exam preparation."
            },
            {
              level: "Diploma",
              desc: "Full proficiency, cultural studies, translation & interpretation modules and project work."
            },
          ].map((s, i) => (
            <motion.div key={s.level} {...pop(i * 0.03)} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: COLORS.gradientPrimary[0] }}>
                <span className="text-white font-semibold">{i + 1}</span>
              </div>
              <div>
                <div style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>{s.level}</div>
                <div className="text-sm text-gray-700">{s.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Short Programs Flip Cards */}
      <motion.section {...fade(0.2)} className="mb-12">
        <SectionTitle icon={<FaBookOpen />} title="Short Programs & Boosters" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shortPrograms.map((p) => (
            <div key={p.title} className="h-44">
              <FlipCard title={p.title} meta={p.meta} details={p.details} />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Admission & Fees accordion */}
      <motion.section {...fade(0.24)} className="mb-12">
        <SectionTitle icon={<FaMoneyCheckAlt />} title="Admission, Fees & Payment" />
        <div className="md:flex gap-6">
          <div className="md:w-2/3">
            <Accordion title="Admission Requirements">
              <ul className="list-disc ml-5">
                <li>Copy of National ID / Passport / Birth Certificate</li>
                <li>2 Passport Size Photos</li>
                <li>Copies of previous Academic Certificates (if any)</li>
                <li>Registration Fee: <b>Ksh 1,000 (non-refundable)</b></li>
                <li>Student ID Card Fee: <b>Ksh 300</b></li>
              </ul>
            </Accordion>

            <Accordion title="Miscellaneous & Exam Fees">
              <ul className="list-disc ml-5">
                <li>Activity Fee: Ksh 1,000 / term</li>
                <li>External Exam fees: notified during admission</li>
                <li>Note: No personal cheques accepted. Fees non-refundable.</li>
              </ul>
            </Accordion>

            <Accordion title="Payment Details">
              <div className="text-sm">
                <p><b>Bank Deposit</b></p>
                <p>Account Name: REGIONAL CURRICULUM MGT. COLLAGE</p>
                <p>Bank: KCB</p>
                <p>Account No: 1269027271</p>
                <div className="mt-3">
                  <p><b>Paybill</b></p>
                  <p>Paybill: 522522</p>
                  <p>Account No: 1269027271</p>
                </div>
              </div>
            </Accordion>
          </div>

          <div className="md:w-1/3 mt-4 md:mt-0">
            <div className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
              <h4 style={{ fontFamily: FONT.semiBold, color: COLORS.primaryDark }}>Quick Notes</h4>
              <ul className="mt-2 text-sm text-gray-700 list-disc ml-5">
                <li>Instalments due by 5th of every month (where applicable).</li>
                <li>Fees include revision/ block release classes.</li>
                <li>Course intakes happen every term.</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Class schedule */}
      <motion.section {...fade(0.28)} className="mb-12">
        <SectionTitle icon={<FaClock />} title="Class Schedule" />
        <div className="space-y-3">
          {[
            { label: "Early Morning", time: "6:15am – 7:45am" },
            { label: "Day", time: "8:00am – 4:00pm" },
            { label: "Evening", time: "6:00pm – 8:00pm" },
            { label: "Weekend", time: "Sat & Sun 11:00am – 6:00pm" },
            { label: "Online", time: "Flexible / Weekdays & Weekends" },
          ].map((s, i) => (
            <motion.div key={s.label} {...pop(i * 0.03)} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: COLORS.gradientPrimary[0] }}>
                <span className="text-white font-semibold">{i + 1}</span>
              </div>
              <div>
                <div style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>{s.label}</div>
                <div className="text-sm text-gray-700">{s.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
