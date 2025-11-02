"use client";

import React from "react";
import { motion } from "framer-motion";
import { Facebook, Youtube, Mail, Phone } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="w-full mt-20 bg-gradient-to-r from-[#1E88E5] to-[#43A047] text-white py-10 md:py-14"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* 🌍 Main Footer Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* 🏫 Column 1 - About */}
        <div>
          <h2 className="text-xl font-bold mb-3">Right Path Schools</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Empowering adults and private candidates in Kenya to achieve
            academic excellence through flexible, affordable learning.
          </p>
        </div>

        {/* 📞 Column 2 - Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm flex items-center gap-2 opacity-90">
            <Phone size={16} /> +254 758 982 859
          </p>
          <p className="text-sm flex items-center gap-2 opacity-90">
            <Mail size={16} /> righttrackschools2025@gmail.com
          </p>
          <p className="text-sm mt-2 opacity-90">
            8th Flr, Mwalimu Co-op House, Tom Mboya Street, Nairobi
          </p>
        </div>

        {/* 🌐 Column 3 - Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/share/17LMh65sfF"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFB300] transition-colors"
            >
              <Facebook />
            </a>
            <a
              href="https://www.youtube.com/@jacodemy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFB300] transition-colors"
            >
              <Youtube />
            </a>
          </div>
        </div>
      </div>

      {/* ⚙️ Divider + Bottom Bar */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm space-y-3 opacity-90">
        {/* ✅ Privacy Policy navigates to new page */}
        <div>
          <Link
            href="/privacy-policy"
            className="hover:text-[#FFB300] transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        {/* 👨‍💻 Developer credit at bottom */}
        <div className="pt-3 text-xs md:text-sm">
          © {new Date().getFullYear()} Right Path Schools — Developed by{" "}
          <a
            href="https://www.jacodemy.com"
            className="text-[#FFB300] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jacodemy
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
