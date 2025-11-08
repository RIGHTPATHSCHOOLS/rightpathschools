"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import THEME from "@/utils/theme";
import {
  FaLaptopCode,
  FaDatabase,
  FaNetworkWired,
  FaUserGraduate,
  FaTools,
  FaGlobe,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaClock,
} from "react-icons/fa";
import Link from "next/link";

const { COLORS, TEXT, BUTTON, CARD, FONT } = THEME;

/* ---------------------------
   Utility animation helpers
--------------------------- */
const fade = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: d },
  viewport: { once: true, amount: 0.2 },
});
const pop = (d = 0) => ({
  initial: { opacity: 0, scale: 0.98 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, delay: d },
  viewport: { once: true },
});

/* ---------------------------
   Small UI building blocks
--------------------------- */
const SectionTitle: React.FC<{ icon?: React.ReactNode; title: string }> = ({ icon, title }) => (
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
  items?: Record<string, string>;
}> = ({ title, subtitle, items = {} }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      initial={{ borderRadius: 12 }}
      className="bg-white shadow-sm border"
      style={{
        borderColor: COLORS.border,
        borderRadius: CARD.default.borderRadius,
      }}
    >
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full text-left p-4 flex items-center justify-between"
      >
        <div>
          <h3 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }} className="text-lg">
            {title}
          </h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
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
            transition={{ duration: 0.35 }}
            className="px-4 pb-4"
          >
            <div className="grid gap-2 text-sm text-gray-700">
              {Object.entries(items).map(([k, v]) => (
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

/* Flip card for short courses */
const FlipCard: React.FC<{ title: string; meta: string; details: string }> = ({ title, meta, details }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped((s) => !s)}
      className="relative cursor-pointer w-full h-44 perspective"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* front side */}
        <div
          className="absolute inset-0 p-4 rounded-lg flex flex-col justify-between"
          style={{
            background: `linear-gradient(135deg, ${COLORS.gradientPrimary[0]}, ${COLORS.gradientPrimary[1]})`,
            color: COLORS.textLight,
            backfaceVisibility: "hidden",
            borderRadius: CARD.default.borderRadius,
            boxShadow: `0 6px 18px ${COLORS.shadow}`,
          }}
        >
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs">{meta}</div>
        </div>

        {/* back side */}
        <div
          className="absolute inset-0 p-4 rounded-lg"
          style={{
            background: COLORS.surfaceLight,
            color: COLORS.textDark,
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            borderRadius: CARD.default.borderRadius,
            boxShadow: `0 6px 18px ${COLORS.shadow}`,
          }}
        >
          <div className="text-sm font-medium mb-2">{title}</div>
          <div className="text-xs text-gray-700 leading-snug">{details}</div>
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------------------
   Data (selected / relevant)
--------------------------- */
const courses = [
  {
    title: "Full-Stack Web & Mobile Development",
    level: "Certificate / Diploma",
    duration: "6 – 24 months",
    grade: "Open",
    exam: "Internal / JP-UK",
    technologies: "JavaScript, Next.js, React, React Native, Node.js",
  },
  {
    title: "Payment & Messaging Integrations",
    level: "Professional Module",
    duration: "3 – 6 months",
    grade: "Open",
    exam: "Internal",
    technologies: "MPESA STK Integration, WhatsApp Business API, Chatbots",
  },
  {
    title: "Cyber Security & Networking",
    level: "Diploma / Professional",
    duration: "9 – 12 months",
    grade: "C- & Above",
    exam: "ICM / JP-UK",
    technologies: "Ethical Hacking, Network Setup, Penetration Testing",
  },
  {
    title: "Data Analytics & Cloud Solutions",
    level: "Short Course / Professional",
    duration: "4 – 8 weeks",
    grade: "Open",
    exam: "Internal",
    technologies: "PowerBI, SPSS, Cloud Platforms",
  },
];

const shortCourses = [
  {
    title: "Web Dev Bootcamp (HTML/CSS/JS)",
    meta: "3 weeks • Intensive",
    details: "Hands-on responsive layouts, JavaScript fundamentals, project based learning.",
  },
  {
    title: "React & Next.js Mini-Project",
    meta: "4 weeks • Practical",
    details: "Build a real web application using Next.js, React components, routing and deployment.",
  },
  {
    title: "React Native Mobile App Sprint",
    meta: "6 weeks • App Build",
    details: "Cross-platform mobile app development with React Native and Expo.",
  },
  {
    title: "MPESA & Payment Gateway Integration",
    meta: "2 weeks • Practical",
    details: "Integrate MPESA STK Push, webhook handling, secure payments in Kenyan context.",
  },
  {
    title: "WhatsApp Business & Chatbot Workshop",
    meta: "3 weeks • Live",
    details: "Automate customer messaging with WhatsApp Business API, build chatbots in Node.js.",
  },
  {
    title: "Cyber Security Essentials",
    meta: "4 weeks • Fundamentals",
    details: "Network defenses, threat modelling, ethical hacking basics and labs.",
  },
];

/* ---------------------------
   Page Layout
--------------------------- */
export default function IctPage() {
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
            <h1 style={{ ...TEXT.h1, color: COLORS.primaryDark }} className="mb-2">
              School of ICT & Digital Innovation
            </h1>
            <p className="text-sm md:text-base text-gray-700 max-w-2xl">
              Right Path Schools — Industry-aligned training in JavaScript, Next.js, React Native, MPESA integrations, WhatsApp Business & chatbots.
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
                Apply Now
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
                Download Prospectus
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
                  <FaLaptopCode />
                </div>
                <div>
                  <div className="text-sm font-semibold">Contact</div>
                  <div className="text-xs text-gray-700">+254 758 982 859</div>
                  <div className="text-xs text-gray-600">righttrackschools2025@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Overview */}
      <motion.section {...fade(0.1)} className="mb-10">
        <SectionTitle icon={<FaUserGraduate />} title="Overview" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div {...pop(0.05)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Vision</h4>
            <p className="text-sm text-gray-700 mt-2">To empower learners with practical digital skills and transform them into industry-ready professionals.</p>
          </motion.div>

          <motion.div {...pop(0.1)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Mission</h4>
            <p className="text-sm text-gray-700 mt-2">To deliver hands-on training in cutting-edge technologies including web & mobile development, payment systems and automation.</p>
          </motion.div>

          <motion.div {...pop(0.15)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Accreditation</h4>
            <p className="text-sm text-gray-700 mt-2">Fully accredited by KNEC, KASNEB & TVETA — qualifications recognized locally and internationally.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Course Categories */}
      <motion.section {...fade(0.15)} className="mb-12">
        <SectionTitle icon={<FaDatabase />} title="Course Categories" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c, i) => (
            <motion.div key={c.title} {...pop(i * 0.05)}>
              <ExpandCard
                title={c.title}
                subtitle={`${c.level} • ${c.duration}`}
                items={{
                  "Entry Grade": c.grade,
                  "Exam Body": c.exam,
                  "Technologies": c.technologies,
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Short Courses */}
      <motion.section {...fade(0.2)} className="mb-12">
        <SectionTitle icon={<FaTools />} title="Short Courses & Bootcamps" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shortCourses.map((s, i) => (
            <div key={s.title} className="h-44">
              <FlipCard title={s.title} meta={s.meta} details={s.details} />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Class Schedule */}
      <motion.section {...fade(0.3)} className="mb-12">
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
      <motion.div {...fade(0.45)} className="text-center mt-12">
        <Link
          href="/join-us"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg shadow-md"
          style={{
            background: BUTTON.primary.backgroundColor,
            color: BUTTON.primary.textColor,
          }}
        >
          Apply Now
        </Link>
      </motion.div>

    </main>
  );
}
