// app/ict/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import THEME from "@/utils/theme";
import {
  FaLaptopCode,
  FaDatabase,
  FaNetworkWired,
  FaUserGraduate,
  FaMoneyCheckAlt,
  FaTools,
  FaGlobe,
  FaChevronDown,
  FaChevronUp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

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

/* Expandable course card with animation */
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

/* A simple accordion used for admission & fees */
const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3 border rounded-lg overflow-hidden" style={{ borderColor: COLORS.border }}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full p-4 flex items-center justify-between bg-white"
      >
        <div className="text-left">
          <div style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>{title}</div>
        </div>
        <div className="text-gray-500">{open ? <FaChevronUp /> : <FaChevronDown />}</div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="p-4 bg-white text-sm text-gray-700"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Flip card for short courses */
const FlipCard: React.FC<{ title: string; meta: string; details: string }> = ({ title, meta, details }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped((s) => !s)}
      className={`relative cursor-pointer w-full h-44 perspective`}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* front */}
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

        {/* back */}
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
    title: "Information Communication Technology (ICT)",
    level: "Certificate / Diploma",
    duration: "1 – 2 years",
    grade: "D & Above (Cert) / C- & Above (Dip)",
    exam: "KNEC",
    fee: "Ksh 15,000 / term",
    terms: "4",
  },
  {
    title: "Programming & Software Engineering",
    level: "Certificate / Diploma",
    duration: "6 months – 1 year",
    grade: "Open",
    exam: "JP-UK / Internal",
    fee: "Ksh 18,000 / term",
    terms: "2–4",
  },
  {
    title: "Cyber Security & Networking",
    level: "Diploma / Professional",
    duration: "9 months – 1 year",
    grade: "C- & Above",
    exam: "ICM / JP-UK",
    fee: "Ksh 15,000 / term",
    terms: "2–4",
  },
  {
    title: "Data Analytics (SPSS, PowerBI)",
    level: "Short Course / Professional",
    duration: "4 weeks – 2 months",
    grade: "Open",
    exam: "Internal",
    fee: "Ksh 10,000",
    terms: "1",
  },
  {
    title: "Computer Repair & Maintenance",
    level: "Certificate",
    duration: "3 months",
    grade: "Open",
    exam: "CISAK Kenya",
    fee: "Ksh 15,000",
    terms: "1",
  },
  {
    title: "Web Development (HTML/CSS/JS/PHP/MySQL)",
    level: "Short / Diploma",
    duration: "1 month – 9 months",
    grade: "Open",
    exam: "Internal / CISAK",
    fee: "Ksh 5,000 – 30,000",
    terms: "1–4",
  },
];

const shortCourses = [
  { title: "Advanced Excel & SPSS", meta: "4 weeks • Ksh 10,000", details: "Data wrangling, pivot tables, basic SPSS workflows, practical exercises." },
  { title: "Graphic Design (Photoshop/Illustrator)", meta: "3 months • Ksh 12,000", details: "Core design workflows, typography, branding, practical project." },
  { title: "AutoCAD / Revit", meta: "3 months • Ksh 15,000", details: "2D drafting, 3D modeling basics, Revit fundamentals." },
  { title: "QuickBooks / Tally", meta: "1 month • Ksh 6,000", details: "Practical accounting packages for SMEs, invoicing and reports." },
  { title: "Data Analytics (PowerBI)", meta: "6 weeks • Ksh 12,000", details: "PowerBI desktop, DAX basics, dashboarding and storytelling." },
  { title: "Web Dev Bootcamp (HTML/CSS/JS)", meta: "3 weeks • Ksh 5,000", details: "Hands-on projects, responsive layout, JS essentials." },
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
              School of ICT & Computer Studies
            </h1>
            <p className="text-sm md:text-base text-gray-700 max-w-2xl">
              Right Path Schools — Fully accredited by KNEC, KASNEB & TVETA.
              Practical, industry-aligned ICT training: Programming, Cyber Security, Networking, Data
              Analytics and more.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-md"
                style={{
                  background: BUTTON.primary.backgroundColor,
                  color: BUTTON.primary.textColor,
                }}
              >
                Apply Now
              </a>

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

      {/* Overview (Vision / Mission / Accreditation) */}
      <motion.section {...fade(0.1)} className="mb-10">
        <SectionTitle icon={<FaUserGraduate />} title="Overview" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div {...pop(0.05)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Vision</h4>
            <p className="text-sm text-gray-700 mt-2">To produce competent ICT professionals with hands-on digital skills.</p>
          </motion.div>

          <motion.div {...pop(0.1)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Mission</h4>
            <p className="text-sm text-gray-700 mt-2">To equip learners with technical, analytical and problem-solving skills through practical ICT education.</p>
          </motion.div>

          <motion.div {...pop(0.15)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Accreditation</h4>
            <p className="text-sm text-gray-700 mt-2">Fully accredited by KNEC, KASNEB and TVETA — recognized national and international qualifications.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Course Categories (Expandable) */}
      <motion.section {...fade(0.15)} className="mb-12">
        <SectionTitle icon={<FaDatabase />} title="Course Categories" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <motion.div key={c.title} {...pop(0.05)} className="">
              <ExpandCard
                title={c.title}
                subtitle={`${c.level} • ${c.duration}`}
                items={{
                  "Entry Grade": c.grade,
                  "Exam Body": c.exam,
                  "Fee": c.fee,
                  "No. of Terms": c.terms,
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Short Courses – Flip Cards */}
      <motion.section {...fade(0.2)} className="mb-12">
        <SectionTitle icon={<FaTools />} title="Short Courses & Packages" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shortCourses.map((s) => (
            <div key={s.title} className="h-44">
              <FlipCard title={s.title} meta={s.meta} details={s.details} />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Fees & Admission Accordion */}
      <motion.section {...fade(0.25)} className="mb-12">
        <SectionTitle icon={<FaMoneyCheckAlt />} title="Fees & Admission" />
        <div className="md:flex gap-6">
          <div className="md:w-2/3">
            <Accordion title="Admission Requirements">
              <ul className="list-disc ml-5">
                <li>Copies of previous Academic Certificates</li>
                <li>Copy of National ID / Passport / Birth Certificate</li>
                <li>2 Passport Size Photographs</li>
                <li>Registration Fee: <b>Ksh 1,000 (non-refundable)</b></li>
                <li>Student ID Card Fee: <b>Ksh 300</b></li>
              </ul>
            </Accordion>

            <Accordion title="Miscellaneous Payments">
              <ul className="list-disc ml-5">
                <li>CAT Fee: Ksh 500 / term</li>
                <li>Activity Fee: Ksh 1,000 / term</li>
                <li>Attachment Fee: Ksh 2,200 (once)</li>
                <li>Business Plan Fee (KNEC students): Ksh 1,000</li>
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
                <li>Instalments due by 5th of every month.</li>
                <li>Fees inclusive of block release / revision classes.</li>
                <li>Single subject registration is subject to approval.</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Class Schedule (timeline) */}
      <motion.section {...fade(0.3)} className="mb-12">
        <SectionTitle icon={<FaGlobe />} title="Class Schedule" />
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
