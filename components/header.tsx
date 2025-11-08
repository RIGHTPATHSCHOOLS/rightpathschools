"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import THEME from "@/utils/theme";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Student Life", path: "/student-life" },
    { name: "Courses", path: "/courses" },
    { name: "Resources", path: "/resources" },
    { name: "Join Us", path: "/join-us" },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
          ? "backdrop-blur-md bg-white/80 shadow-md"
          : "bg-linear-to-r from-[#1E88E5]/90 to-[#43A047]/90"
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center h-16">
        {/* Logo + Name */}
       {/* 🔗 Logo + Name linked to Home */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Right Path Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span
            className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
              scrolled ? "text-gray-900" : "text-white drop-shadow-md"
            }`}
            style={{
              fontFamily: THEME.FONT.bold,
              letterSpacing: "0.3px",
            }}
          >
            Right Path Schools
          </span>
        </Link>
        <Link className="text-sm font-medium text-[#1E88E5] hover:text-[#1E88E5]/80 bg-white px-4 py-2 rounded-full" href="/portal">Portal
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`relative text-sm font-medium transition-colors duration-200 ${scrolled
                    ? isActive
                      ? "text-[#1E88E5]"
                      : "text-gray-800 hover:text-[#1E88E5]"
                    : isActive
                      ? "text-yellow-300"
                      : "text-white hover:text-yellow-200"
                  }`}
                style={{ fontFamily: THEME.FONT.medium }}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-current rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden transition ${scrolled ? "text-gray-800" : "text-white"
            }`}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-md"
          >
            <div className="flex flex-col px-5 py-3 space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`font-medium transition ${isActive
                        ? "text-[#1E88E5]"
                        : "text-gray-800 hover:text-[#1E88E5]"
                      }`}
                    style={{ fontFamily: THEME.FONT.medium }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
