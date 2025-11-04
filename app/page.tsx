"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  IoSchoolOutline,
  IoEarthOutline,
  IoLanguageOutline,
  IoLaptopOutline,
  IoPersonAddOutline,
  IoBookOutline,
  IoCallOutline,
  IoDownloadOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import THEME from "@/utils/theme";
import HeroBanner from "@/components/banner";

const HomePage = () => {
  const router = useRouter();

  const courses = [
    {
      title: "KCSE PRIVATE CANDIDATES",
      count: 4,
      icon: IoSchoolOutline,
      color: THEME.COLORS.primary,
      route: "/requirements/kcse",
    },
    {
      title: "IGCSE PRIVATE CANDIDATES",
      count: 1,
      icon: IoEarthOutline,
      color: THEME.COLORS.secondary,
      route: "/requirements/igcse",
    },
    {
      title: "LANGUAGES",
      count: 0,
      icon: IoLanguageOutline,
      color: THEME.COLORS.accent,
      route: "/requirements/languages",
    },
    {
      title: "ICT",
      count: 3,
      icon: IoLaptopOutline,
      color: THEME.COLORS.info,
      route: "/requirements/ict",
    },
  ];

  const quickActions = [
    { title: "Join Us", icon: IoPersonAddOutline, color: THEME.COLORS.primary, route: "/join-us" },
    { title: "Resources", icon: IoBookOutline, color: THEME.COLORS.secondary, route: "/resources" },
    { title: "Contact Us", icon: IoCallOutline, color: THEME.COLORS.accent, route: "/contact" },
  ];

  return (
    <div
      className="min-h-screen p-2 md:p-5"
      style={{
        background: `linear-gradient(135deg, ${THEME.COLORS.gradientBackground.join(",")})`,
      }}
    >
      {/* 🔹 Themed Headings */}
      <div className="text-center mt-2 mb-3">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2"
          style={{
            color: THEME.COLORS.primaryDark,
            fontFamily: THEME.FONT.bold,
            textShadow: `2px 2px 10px ${THEME.COLORS.secondary}33`,
            letterSpacing: "0.05em",
          }}
        >
          RIGHT PATH SCHOOLS
        </h1>

        <h3
          className="text-lg sm:text-xl md:text-2xl font-medium"
          style={{
            color: THEME.COLORS.accent,
            fontFamily: THEME.FONT.regular,
          }}
        >
          Centre for Adult and Private Candidates
        </h3>

        {/* Accent line under title */}
        <div
          className="mx-auto mt-3 h-1 w-24 rounded-full"
          style={{
            background: `linear-gradient(to right, ${THEME.COLORS.primary}, ${THEME.COLORS.secondary})`,
          }}
        ></div>
      </div>

      {/* 🔹 Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center my-6"
      >
        <HeroBanner />
      </motion.div>

      <h3
        className="text-lg sm:text-xl md:text-2xl font-medium justify-center flex mb-2"
        style={{
          color: THEME.COLORS.accent,
          fontFamily: THEME.FONT.regular,
        }}
      >
        Our Programs
      </h3>

      {/* 🔹 Courses Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {courses.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(item.route)}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition"
          >
            <item.icon size={38} color={item.color} />
            <div>
              <p className="font-semibold text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-500">{item.count} Courses</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 🔹 Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-semibold mb-6 text-black justify-center flex">
          Quick Actions
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(action.route)}
              className="cursor-pointer bg-white rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition group"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: `${action.color}22` }}
              >
                <action.icon size={26} color={action.color} />
              </div>

              {/* Title + Animated Arrow */}
              <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                <p>{action.title}</p>
                <IoArrowForwardOutline
                  size={16}
                  color={action.color}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 🔹 CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-16"
      >
        <div
          className="rounded-2xl p-10 text-center shadow-lg"
          style={{
            background: `linear-gradient(90deg, ${THEME.COLORS.gradientPrimary.join(",")})`,
            color: THEME.COLORS.textLight,
          }}
        >
          <h3 className="text-2xl font-bold mb-3">Download Requirements</h3>
          <p className="text-sm mb-6">
            View and download admission requirements for KCSE, IGCSE, Languages, and ICT programs.
          </p>

          <button
            onClick={() => router.push("/resources")}
            className="flex items-center justify-center gap-2 mx-auto bg-white text-blue-700 font-medium py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer"
          >
            <IoDownloadOutline size={20} />
            View All Requirements
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
