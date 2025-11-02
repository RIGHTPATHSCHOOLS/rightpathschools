// app/kcse/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import THEME from "@/utils/theme";
import {
  FaInfoCircle,
  FaBook,
  FaMoneyCheckAlt,
  FaDownload,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
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

const ExpandCard: React.FC<{ title: string; subtitle?: string; items?: Record<string, string> }> = ({
  title,
  subtitle,
  items = {},
}) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="bg-white border" style={{ borderColor: COLORS.border, borderRadius: CARD.default.borderRadius }}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full p-4 flex items-start justify-between text-left"
      >
        <div>
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

const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3 rounded-lg overflow-hidden border" style={{ borderColor: COLORS.border }}>
      <button onClick={() => setOpen((s) => !s)} className="w-full p-4 flex items-center justify-between bg-white">
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

/* -------------------------
   content (from your doc)
   ------------------------- */

const admissionRequirements = [
  "Copy of Birth Certificate & National ID",
  "Copy of KCPE Certificate/Slip",
  "3 Colored Passport photos",
  "Registration fee of Kshs. 2,000",
  "Student ID card fee of Kshs. 300",
  "A ream of printing papers (for revision)",
  "1 graph book, 1 geometric set, 10 A4-size exercise books, 1 spring file",
  "Proof of payment (Bank slip or Mobile money receipt)",
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
  "English Literature: Father of Nations (Paul B. Vitta) – compulsory novel; The Samaritan (John Lara) – compulsory play; Parliament of Owls (Adipo Sidang) – optional play; Artist of the Floating World (Kazuo Ishiguro) – optional novel; A Silent Song and Other Stories (Godwin Siundu) – optional short stories.",
  "Kiswahili Fasihi: Bembea ya Maisha (Dr. Timothy Moriasi), Mapambazuko ya Machweo, Nguu za Jadi (Prof. Clara Momanyi).",
];

const feeRows = [
  ["Early Morning (6am–8am)", "14,000", "14,000", "14,000"],
  ["Full-time (9am–4pm)", "15,000", "15,000", "15,000"],
  ["Evening (6pm–8pm)", "14,000", "14,000", "14,000"],
  ["Online (6pm–10pm)", "14,000", "14,000", "14,000"],
  ["Bridging", "12,000", "12,000", "12,000"],
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
            <h1 style={{ ...TEXT.h1, color: COLORS.primaryDark }} className="mb-2">KCSE Programme Admission</h1>
            <p className="text-sm md:text-base text-gray-700 max-w-2xl">
              Right Path Schools – School of Continuing Education. Two-year programme covering Forms 1–4, prepared for KCSE.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/join-us"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-md"
                style={{ background: BUTTON.primary.backgroundColor, color: BUTTON.primary.textColor }}
              >
                Apply Now
              </a>

              <a
                href="#admission-letter"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{ border: `1px solid ${COLORS.primary}`, color: COLORS.primary, background: COLORS.surfaceLight }}
              >
                <FaDownload /> Download Admission Letter
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:w-1/3">
            <div className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 10px 30px ${COLORS.shadow}`, borderRadius: CARD.default.borderRadius }}>
              <div className="flex items-start gap-3">
                <div className="text-3xl" style={{ color: COLORS.primary }}><FaInfoCircle /></div>
                <div>
                  <div className="text-sm font-semibold">Contact</div>
                  
                  
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-600">
                <div className="text-xs text-gray-700">+254 758 982 859</div>
                <br />
                <div className="text-xs text-gray-700">8th Flr, Mwalimu Co-op Hse, Tom Mboya Street, Nairobi</div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* OVERVIEW */}
      <motion.section {...fade(0.08)} className="mb-10">
        <SectionTitle icon={<FaBook />} title="Overview" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div {...pop(0.05)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>What you'll study</h4>
            <p className="text-sm text-gray-700 mt-2">Secondary syllabus over two years (Forms 1–4). Each year has 3 terms, CATS and End Term exams, with assignments and online self-assessments.</p>
          </motion.div>

          <motion.div {...pop(0.1)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Modes of study</h4>
            <p className="text-sm text-gray-700 mt-2">Fulltime, Evening, Online (live sessions via Google Meet/Zoom). Bridging classes available.</p>
          </motion.div>

          <motion.div {...pop(0.15)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Student support</h4>
            <p className="text-sm text-gray-700 mt-2">Topical notes, online module with self-tests, and revision blocks to prepare for KCSE.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* ADMISSION REQUIREMENTS CARDS */}
      <motion.section {...fade(0.12)} className="mb-12">
        <SectionTitle icon={<FaInfoCircle />} title="Admission Requirements" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {admissionRequirements.map((req, i) => (
            <motion.div key={i} {...pop(i * 0.03)} className="">
              <div className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 6px 18px ${COLORS.shadow}`, borderRadius: CARD.default.borderRadius }}>
                <div className="text-sm text-gray-700">{req}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* COURSE OVERVIEW */}
      <motion.section {...fade(0.16)} className="mb-12">
        <SectionTitle icon={<FaBook />} title="Course Overview & Structure" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div {...pop(0.05)} className="p-5 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}`, borderRadius: CARD.default.borderRadius }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Two-year programme</h4>
            <ul className="list-disc ml-5 mt-3 text-sm text-gray-700">
              <li>Year 1: Form 1 & 2</li>
              <li>Year 2: Form 3 & 4</li>
              <li>Each year has 3 terms (CATS and End Term Exams)</li>
              <li>Assignments and classwork are required</li>
            </ul>
          </motion.div>

          <motion.div {...pop(0.1)} className="p-5 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}`, borderRadius: CARD.default.borderRadius }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Assessment & Exams</h4>
            <p className="text-sm text-gray-700 mt-2">Students sit for KCSE at the end of Year 2. Internal assessments include CATS and term exams. Online self-assessment tests available on the learning module.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* COURSE BOOKS */}
      <motion.section {...fade(0.2)} className="mb-12">
        <SectionTitle icon={<FaBook />} title="Course Books & Set Books" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div {...pop(0.05)} className="p-5 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}`, borderRadius: CARD.default.borderRadius }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Core Subjects & Texts</h4>
            <ul className="list-disc ml-5 mt-3 text-sm text-gray-700">
              {coreSubjects.map((s) => <li key={s}>{s}</li>)}
            </ul>
            <p className="text-xs text-gray-500 mt-3">Learners will also receive summarized topical notes and online module resources.</p>
          </motion.div>

          <motion.div {...pop(0.1)} className="p-5 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}`, borderRadius: CARD.default.borderRadius }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Set Books</h4>
            {setBooksText.map((t, i) => (
              <p className="text-sm text-gray-700 mt-2" key={i}>{t}</p>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FEE STRUCTURE (animated table) */}
      <motion.section {...fade(0.24)} className="mb-12">
        <SectionTitle icon={<FaMoneyCheckAlt />} title="Fee Structure" />
        <motion.div {...pop(0.05)} className="rounded-lg overflow-hidden" style={{ boxShadow: `0 10px 30px ${COLORS.shadow}` }}>
          <div style={{ background: COLORS.primary, color: COLORS.textLight }} className="p-3">
            <div className="text-sm font-semibold">Mode of Study - Term Fees</div>
          </div>

          <div className="bg-white p-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-3 text-left">Mode of Study</th>
                  <th className="py-2 px-3 text-left">Term 1</th>
                  <th className="py-2 px-3 text-left">Term 2</th>
                  <th className="py-2 px-3 text-left">Term 3</th>
                </tr>
              </thead>
              <tbody>
                {feeRows.map(([mode, t1, t2, t3], i) => (
                  <motion.tr
                    key={mode}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}
                  >
                    <td className="py-2 px-3">{mode}</td>
                    <td className="py-2 px-3">{t1}</td>
                    <td className="py-2 px-3">{t2}</td>
                    <td className="py-2 px-3">{t3}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 text-sm" style={{ color: COLORS.textGray }}>
              <p>KCSE Registration: <b>Ksh 14,000 (one-time)</b></p>
              <p>Laboratory Fee: <b>Ksh 4,000 (one-time)</b></p>
              <p className="mt-2">Students must clear fees before attending classes or arrange a payment plan with administration. Fees payable via Bank deposit or MPESA. Cheques payable to RIGHT PATH SCHOOLS.</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* PAYMENT DETAILS */}
      <motion.section {...fade(0.28)} className="mb-12">
        <SectionTitle icon={<FaMoneyCheckAlt />} title="Payment Details" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div {...pop(0.05)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>LIPA NA MPESA</h4>
            <p className="text-sm text-gray-700 mt-2"><b>PAYBILL:</b> 222111</p>
            <p className="text-sm text-gray-700"><b>Account:</b> 2639664</p>
            <p className="text-sm text-gray-700 mt-2"><b>Name:</b> RIGHT PATH SCHOOLS</p>
          </motion.div>

          <motion.div {...pop(0.1)} className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>Bank Deposit</h4>
            <p className="text-sm text-gray-700 mt-2"><b>Bank:</b> Family Bank</p>
            <p className="text-sm text-gray-700"><b>Account No:</b> 038000048169</p>
            <p className="text-sm text-gray-700 mt-2"><b>Payable to:</b> RIGHT PATH SCHOOLS</p>
          </motion.div>
        </div>
      </motion.section>

      {/* ADMISSIONS ACCORDIONS & NOTES */}
      <motion.section {...fade(0.32)} className="mb-12">
        <SectionTitle icon={<FaInfoCircle />} title="Admissions Notes & Miscellaneous Fees" />
        <div className="md:flex gap-6">
          <div className="md:w-2/3">
            <Accordion title="Admission Requirements (details)">
              <ul className="list-disc ml-5">
                {admissionRequirements.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </Accordion>

            <Accordion title="Miscellaneous Payments">
              <ul className="list-disc ml-5">
                <li>Continuous Assessment Test (CAT) fee: Ksh 500 / term</li>
                <li>External Examination Fee: to be notified during admission</li>
                <li>Activity Fee: Ksh 1,000 / term</li>
                <li>Attachment Fee: Ksh 2,000 – paid once during the last term</li>
              </ul>
            </Accordion>
          </div>

          <div className="md:w-1/3 mt-4 md:mt-0">
            <div className="p-4 rounded-lg" style={{ background: COLORS.surfaceLight, boxShadow: `0 8px 20px ${COLORS.shadow}` }}>
              <h4 style={{ fontFamily: FONT.semiBold, color: COLORS.primaryDark }}>Quick Notes</h4>
              <ul className="mt-2 text-sm text-gray-700 list-disc ml-5">
                <li>No uniform required.</li>
                <li>Smartphone or computer recommended for online classes.</li>
                <li>Students study one optional English set book only.</li>
              </ul>
            </div>
          </div>
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
