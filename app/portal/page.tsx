"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  IoHomeOutline,
  IoSchoolOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import THEME from "@/utils/theme";
import toast from "react-hot-toast";
import { useAuthStore } from "@/utils/useAuthStore";

const PortalPage: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) {
      toast.error("🔒 Please log in to access the portal.");
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    toast.success("👋 You’ve been logged out.");
    setTimeout(() => router.push("/login"), 1000);
  };

  if (!user) return null; // Prevent flicker while redirecting

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-6 text-center"
      style={{
        background: `linear-gradient(135deg, ${THEME.COLORS.gradientPrimary[0]}, ${THEME.COLORS.gradientPrimary[1]})`,
        fontFamily: THEME.FONT.regular,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-10 max-w-md w-full"
      >
        <motion.h1
          className="text-3xl font-bold mb-4 text-[#1E88E5]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🎉 Welcome, {user.fullName || "Guest"}!
        </motion.h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          You’re successfully logged in as{" "}
          <span className="font-semibold">{user.role}</span>. Explore your
          dashboard and courses below.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => router.push("/dashboard")}
          >
            <IoHomeOutline size={18} /> Dashboard
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
            onClick={() => router.push("/courses")}
          >
            <IoSchoolOutline size={18} /> Courses
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition"
            onClick={handleLogout}
          >
            <IoLogOutOutline size={18} /> Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PortalPage;
