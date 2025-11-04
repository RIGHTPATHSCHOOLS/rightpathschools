"use client";

import { motion } from "framer-motion";
import {
  IoLogoWhatsapp,
  IoMailOutline,
  IoLocationOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import THEME from "@/utils/theme";

const ContactPage = () => {
  const contacts = [
    {
      name: "Main WhatsApp",
      number: "+254796628615",
      link: "https://wa.me/254796628615",
      color: THEME.COLORS.primary,
    },
    {
      name: "Admissions WhatsApp",
      number: "+254758982859",
      link: "https://wa.me/254758982859",
      color: THEME.COLORS.secondary,
    },
  ];

  return (
    <div
      className="min-h-screen p-5 md:p-10 flex flex-col items-center"
      style={{
        background: `linear-gradient(135deg, ${THEME.COLORS.gradientBackground.join(",")})`,
      }}
    >
      {/* 🔹 Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-3"
          style={{
            color: THEME.COLORS.primaryDark,
            fontFamily: THEME.FONT.bold,
            textShadow: `2px 2px 10px ${THEME.COLORS.secondary}33`,
          }}
        >
          Contact Us
        </h1>
        <p
          className="text-base md:text-lg max-w-2xl mx-auto text-gray-700"
          style={{ fontFamily: THEME.FONT.regular }}
        >
          <strong>Right Path Schools</strong> — Empowering adults and private candidates in Kenya to
          achieve academic excellence through flexible, affordable learning.
        </p>
      </motion.div>

      {/* 🔹 WhatsApp Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
      >
        {contacts.map((contact, i) => (
          <motion.a
            key={i}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl flex items-center justify-between transition cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${contact.color}22`,
                }}
              >
                <IoLogoWhatsapp size={30} color={contact.color} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.number}</p>
              </div>
            </div>

            <IoArrowForwardOutline
              size={20}
              color={contact.color}
              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
            />
          </motion.a>
        ))}
      </motion.div>

      {/* 🔹 Email & Location Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-12 w-full max-w-2xl text-center"
      >
        <div className="flex flex-col items-center gap-6 text-gray-700">
          {/* Email */}
          <motion.a
            href="mailto:rightpathschools2025@gmail.com"
            className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            whileHover={{ y: -3 }}
          >
            <IoMailOutline size={24} color={THEME.COLORS.primary} />
            <span className="text-sm md:text-base font-medium">
              rightpathschools2025@gmail.com
            </span>
          </motion.a>

          {/* Location */}
          <motion.div
            className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            whileHover={{ y: -3 }}
          >
            <IoLocationOutline size={24} color={THEME.COLORS.accent} />
            <span className="text-sm md:text-base font-medium">
              8th Flr, Mwalimu Co-op House, Tom Mboya Street, Nairobi
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* 🔹 CTA WhatsApp Footer */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-16 text-center"
      >
        <a
          href="https://wa.me/254796628615"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-all transform hover:scale-105"
        >
          <IoLogoWhatsapp size={22} />
          Chat with Us on WhatsApp
        </a>
      </motion.div>
    </div>
  );
};

export default ContactPage;
