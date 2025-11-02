"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldCheck, FileText, Scale, ArrowLeft } from "lucide-react";
import THEME from "@/utils/theme";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const PrivacyAndTerms: React.FC = () => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen px-6 md:px-20 py-16"
      style={{
        background: `linear-gradient(135deg, ${THEME.COLORS.gradientFloral[0]}, ${THEME.COLORS.gradientFloral[2]})`,
      }}
    >
      <motion.div
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-10 md:p-16"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-10 space-y-3">
          <h1
            style={{
              ...THEME.TEXT.h1,
              color: THEME.COLORS.primaryDark,
              fontFamily: THEME.FONT.extraBold,
            }}
          >
            Privacy Policy & Terms of Service
          </h1>
          <p style={{ ...THEME.TEXT.body, color: THEME.COLORS.textGray }}>
            Effective Date: January 1, 2025
          </p>
        </motion.div>

        {/* Section 1 */}
        <motion.section
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck
              size={28}
              color={THEME.COLORS.primary}
              className="flex-shrink-0"
            />
            <h2 style={{ ...THEME.TEXT.h2 }}>1. Privacy Policy</h2>
          </div>
          <p style={THEME.TEXT.body} className="mb-4">
            Right Path Schools is committed to protecting your privacy. This
            policy explains how we collect, use, and safeguard your personal
            information when you interact with our website or enroll in our
            programs.
          </p>

          <ul className="list-disc ml-8 space-y-2 text-gray-700">
            <li>
              We collect personal data such as name, phone number, and ID for
              admission purposes only.
            </li>
            <li>
              Your data will not be sold or shared with third parties without
              your consent.
            </li>
            <li>
              We use secure systems to store and process your information
              safely.
            </li>
            <li>
              By submitting the admission form, you consent to the use of your
              data for academic administration.
            </li>
          </ul>
        </motion.section>

        {/* Section 2 */}
        <motion.section
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText
              size={28}
              color={THEME.COLORS.secondary}
              className="flex-shrink-0"
            />
            <h2 style={{ ...THEME.TEXT.h2 }}>2. Terms & Conditions</h2>
          </div>

          <p style={THEME.TEXT.body} className="mb-4">
            By enrolling at Right Path Schools, you agree to the following
            terms:
          </p>
          <ul className="list-disc ml-8 space-y-2 text-gray-700">
            <li>
              All fees must be paid in full before attending classes, unless an
              approved payment plan is in place.
            </li>
            <li>
              Students must adhere to class attendance, conduct, and examination
              rules.
            </li>
            <li>
              Online learners are responsible for stable internet access and
              participation in virtual sessions.
            </li>
            <li>
              All school content and materials are protected by copyright and
              may not be redistributed.
            </li>
          </ul>
        </motion.section>

        {/* Section 3 */}
        <motion.section
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Scale
              size={28}
              color={THEME.COLORS.accent}
              className="flex-shrink-0"
            />
            <h2 style={{ ...THEME.TEXT.h2 }}>3. Policy Updates</h2>
          </div>
          <p style={THEME.TEXT.body}>
            We may update this Privacy Policy and Terms periodically to reflect
            institutional or regulatory changes. All updates will be posted on
            this page, and continued use of our services constitutes acceptance
            of the revised terms.
          </p>
        </motion.section>

        {/* Footer */}
        <motion.div
          variants={fadeUp}
          className="text-center border-t border-gray-200 pt-6 mt-10"
        >
          <p style={{ ...THEME.TEXT.caption }}>
            © {new Date().getFullYear()} Right Path Schools — All Rights
            Reserved.
          </p>
          <p
            style={{
              ...THEME.TEXT.caption,
              marginTop: 4,
              color: THEME.COLORS.secondaryDark,
            }}
          >
            Nairobi, Kenya
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          className="flex justify-center mt-10"
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-6 py-3 rounded-full shadow-md transition-all duration-300"
            style={{
              backgroundColor: THEME.COLORS.primary,
              color: THEME.COLORS.textLight,
              fontFamily: THEME.FONT.medium,
            }}
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyAndTerms;
