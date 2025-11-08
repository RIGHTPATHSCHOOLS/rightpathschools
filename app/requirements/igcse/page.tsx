"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import THEME from "@/utils/theme";
import {
  FaGlobe,
  FaBook,
  FaSchool,
  FaDownload,
  FaInfoCircle,
} from "react-icons/fa";

const { COLORS, FONT, TEXT, BUTTON, CARD } = THEME;

/* -------------------------
   Animation helpers
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
   Reusable UI components
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

/* -------------------------
   Data
   ------------------------- */
const igcseSubjects = [
  "English Language",
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "Computer Science",
  "Business Studies",
  "Economics",
  "Geography",
  "History",
  "French",
  "German",
  "Kiswahili",
  "Art & Design",
  "Music",
  "Physical Education",
  "Accounting",
  "ICT",
];

/* -------------------------
   Page
   ------------------------- */
export default function IgcsePage() {
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
              IGCSE Programme — Right Path Schools
            </h1>
            <p className="text-sm md:text-base text-gray-700 max-w-2xl">
              The International General Certificate of Secondary Education
              (IGCSE) at Right Path Schools is a globally recognised
              Cambridge-based curriculum that prepares learners for advanced
              study and global academic opportunities.
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
                href="#prospectus"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  border: `1px solid ${COLORS.primary}`,
                  color: COLORS.primary,
                  background: COLORS.surfaceLight,
                }}
              >
                <FaDownload /> Download Prospectus
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
                  <div className="text-sm font-semibold">
                    Cambridge IGCSE Programme
                  </div>
                  <div className="text-xs text-gray-700">
                    Offered exclusively at Right Path Schools.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ABOUT */}
      <motion.section {...fade(0.08)} className="mb-10">
        <SectionTitle
          icon={<FaBook />}
          title="About IGCSE at Right Path Schools"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            {...pop(0.05)}
            className="p-4 rounded-lg"
            style={{
              background: COLORS.surfaceLight,
              boxShadow: `0 8px 20px ${COLORS.shadow}`,
            }}
          >
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>
              World-Class Curriculum
            </h4>
            <p className="text-sm text-gray-700 mt-2">
              Right Path Schools delivers the Cambridge IGCSE curriculum,
              combining academic rigor, critical thinking, and creativity to
              prepare learners for success globally.
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
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>
              Why Choose Us
            </h4>
            <p className="text-sm text-gray-700 mt-2">
              Our IGCSE learners benefit from small classes, modern facilities,
              digital resources, and highly qualified teachers committed to
              holistic education.
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
            <h4 style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}>
              Pathway to Global Opportunities
            </h4>
            <p className="text-sm text-gray-700 mt-2">
              Our IGCSE students seamlessly progress to A-Level and university
              foundation programs locally and abroad.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* SUBJECTS */}
      <motion.section {...fade(0.12)} className="mb-12">
        <SectionTitle icon={<FaSchool />} title="Subjects Offered" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {igcseSubjects.map((s, i) => (
            <motion.div
              key={i}
              {...pop(i * 0.03)}
              className="p-4 rounded-lg"
              style={{
                background: COLORS.surfaceLight,
                boxShadow: `0 8px 20px ${COLORS.shadow}`,
              }}
            >
              <div
                style={{ fontFamily: FONT.medium, color: COLORS.primaryDark }}
              >
                {s}
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
      <motion.div {...fade(0.24)} className="text-center mt-12">
        <a
          href="/join-us"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg shadow-md"
          style={{
            background: BUTTON.primary.backgroundColor,
            color: BUTTON.primary.textColor,
          }}
        >
          Apply for IGCSE
        </a>
      </motion.div>
    </main>
  );
}
