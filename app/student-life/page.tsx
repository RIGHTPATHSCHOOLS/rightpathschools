"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoPeopleOutline,
  IoRibbonOutline,
  IoEarthOutline,
  IoMicOutline,
  IoLaptopOutline,
  IoColorPaletteOutline,
  IoLeafOutline,
} from "react-icons/io5";
import THEME from "@/utils/theme";

const { COLORS, FONT } = THEME;

const StudentLife = () => {
  const highlights = [
    {
      title: "Vibrant Community",
      desc: "Students enjoy a warm, inclusive environment that promotes teamwork and creativity.",
      icon: <IoPeopleOutline size={32} color={COLORS.primary} />,
      color: COLORS.primary,
    },
    {
      title: "Leadership & Clubs",
      desc: "Over 10 active clubs — from Debate and Environment to ICT and Drama.",
      icon: <IoRibbonOutline size={32} color={COLORS.secondary} />,
      color: COLORS.secondary,
    },
    {
      title: "Cultural Diversity",
      desc: "We celebrate global cultures with themed events and interactive cultural days.",
      icon: <IoEarthOutline size={32} color={COLORS.accent} />,
      color: COLORS.accent,
    },
  ];

  const clubs = [
    {
      name: "Debate Society",
      icon: <IoMicOutline size={26} color={COLORS.primary} />,
      desc: "Sharpen your public speaking and critical thinking skills.",
      color: COLORS.primary,
    },
    {
      name: "ICT Club",
      icon: <IoLaptopOutline size={26} color={COLORS.secondary} />,
      desc: "Learn coding, robotics, and digital innovation hands-on.",
      color: COLORS.secondary,
    },
    {
      name: "Drama Club",
      icon: <IoColorPaletteOutline size={26} color={COLORS.accent} />,
      desc: "Bring creativity to life on stage through storytelling and performance.",
      color: COLORS.accent,
    },
    {
      name: "Environment Club",
      icon: <IoLeafOutline size={26} color="#22c55e" />,
      desc: "Champion sustainability through school and community projects.",
      color: "#22c55e",
    },
  ];

  const alumni = [
    {
      name: "James K.",
      image: "/students/alumni1.png",
      story:
        "Right Path helped me discover confidence and pursue higher education abroad.",
      year: "Class of 2023",
    },
    {
      name: "Linet K.",
      image: "/students/alumni2.png",
      story:
        "From an adult learner to a mentor — this school changed my perspective forever.",
      year: "Class of 2021",
    },
  ];

  const gallery = [
    "/students/student1.png",
    "/students/student2.png",
    "/students/student3.png",
    "/students/student4.png",
    "/students/student5.png",
    "/students/student6.png",
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 🌟 Highlights */}
      <section className="py-16 px-6 md:px-12">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{ fontFamily: FONT.bold, color: COLORS.primaryDark }}
        >
          Student Life Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="rounded-2xl p-6 text-center shadow-md bg-white"
            >
              <div
                className="mx-auto mb-3 flex items-center justify-center w-14 h-14 rounded-full"
                style={{ backgroundColor: `${item.color}25` }}
              >
                {item.icon}
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🏆 Clubs */}
      <section className="py-16 bg-white px-6 md:px-12">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{ fontFamily: FONT.bold, color: COLORS.primaryDark }}
        >
          Clubs & Societies
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {clubs.map((club, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="min-w-[250px] rounded-2xl p-6 text-center shadow-sm bg-gray-50 hover:shadow-lg transition"
            >
              <div
                className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full"
                style={{ backgroundColor: `${club.color}20` }}
              >
                {club.icon}
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: club.color }}
              >
                {club.name}
              </h3>
              <p className="text-gray-600 text-sm">{club.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🎓 Alumni */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{ fontFamily: FONT.bold, color: COLORS.primaryDark }}
        >
          Alumni Stories
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {alumni.map((alum, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className="flex items-center bg-white rounded-2xl shadow-md p-4"
            >
              <Image
                src={alum.image}
                alt={alum.name}
                width={80}
                height={80}
                className="rounded-full mr-4 object-cover"
              />
              <div>
                <h4
                  className="font-bold text-lg"
                  style={{ color: COLORS.primary }}
                >
                  {alum.name}
                </h4>
                <p className="text-sm text-gray-500">{alum.year}</p>
                <p className="text-gray-700 text-sm mt-2">{alum.story}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📸 Gallery */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{ fontFamily: FONT.bold, color: COLORS.primaryDark }}
        >
          Photo Moments
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl"
            >
              <Image
                src={img}
                alt={`Gallery ${i}`}
                width={400}
                height={300}
                className="object-cover w-full h-56 hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✨ CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="py-20 text-center bg-gradient-to-r from-[#1E88E5] to-[#43A047] text-white"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to experience student life with us?
        </h3>
        <Link
          href="/join-us"
          className="inline-block bg-white text-[#1E88E5] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Join Us Today
        </Link>
      </motion.section>
    </div>
  );
};

export default StudentLife;
