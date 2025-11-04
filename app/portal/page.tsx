"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  BarChart2,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/utils/useAuthStore";
import THEME from "@/utils/theme";

const tabs = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "results", label: "Results", icon: BarChart2 },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function StudentDashboard() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");

  // 🚨 Redirect if not logged in or password not yet changed
  useEffect(() => {
    if (!user || !token) {
      toast.error("Please log in to access your dashboard.");
      router.push("/login");
    } else if (user.agreedToPolicy === false) {
      toast("Please complete your first-time setup.");
      router.push("/change-password");
    }
  }, [user, token, router]);

  if (!user || !token) return null; // wait for redirect

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    router.push("/login");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome back, {user.fullName.split(" ")[0]} 👋
            </h2>
            <p className="text-gray-600">
              Here’s a quick overview of your progress and classes.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Active Courses", value: 4 },
                { label: "Assignments Due", value: 2 },
                { label: "Completion Rate", value: "68%" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-2xl p-6 bg-white shadow-md border border-gray-100"
                >
                  <h4 className="text-lg font-medium text-gray-800">{item.label}</h4>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case "courses":
        return (
          <motion.div
            key="courses"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  key={i}
                  className="rounded-2xl p-5 bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  <h4 className="text-lg font-semibold text-blue-700">
                    KCSE Mathematics {i}
                  </h4>
                  <p className="text-gray-600 mt-2">Progress: 60%</p>
                  <div className="mt-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case "results":
        return (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Performance</h2>
            <div className="p-6 bg-white shadow-md rounded-2xl border border-gray-100">
              <p className="text-gray-600">Your performance analytics will appear here 📊</p>
            </div>
          </motion.div>
        );

      case "messages":
        return (
          <motion.div
            key="messages"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Messages & Support 💬</h2>
            <div className="p-6 bg-white shadow-md rounded-2xl border border-gray-100">
              <p className="text-gray-600">
                You can chat with your instructors or our support team here.
              </p>
            </div>
          </motion.div>
        );

      case "settings":
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile & Settings ⚙️</h2>
            <div className="p-6 bg-white shadow-md rounded-2xl border border-gray-100 space-y-2">
              <p className="text-gray-700">
                <strong>Name:</strong> {user.fullName}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {user.phone}
              </p>
              {user.email && (
                <p className="text-gray-700">
                  <strong>Email:</strong> {user.email}
                </p>
              )}
              <p className="text-gray-700">
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50 flex flex-col"
      style={{ fontFamily: THEME.FONT.regular }}
    >
      {/* Top Bar */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-700">
          🎓 Right Path Student Portal
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </header>

      {/* Tabs */}
      <nav className="bg-white border-b border-gray-100 px-6 py-3 flex gap-4 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </motion.button>
          );
        })}
      </nav>

      {/* Content */}
      <main className="flex-1 p-6">
        <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
      </main>
    </div>
  );
}
