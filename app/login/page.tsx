"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  IoCallOutline,
  IoLockClosedOutline,
  IoLogInOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import THEME from "@/utils/theme";
import Link from "next/link";
import { useAuthStore } from "@/utils/useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Zustand actions
  const { setUser } = useAuthStore();

  // Normalize Kenyan phone number to format 2547XXXXXXXX
  const normalizePhoneNumber = (phone: string): string => {
    let normalized = phone.trim().replace(/[\s\-\(\)]/g, ""); // remove spaces, dashes, ()
    if (normalized.startsWith("+254")) {
      normalized = "254" + normalized.slice(4);
    } else if (normalized.startsWith("0")) {
      normalized = "254" + normalized.slice(1);
    } else if (normalized.startsWith("7")) {
      normalized = "254" + normalized;
    }
    return normalized;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.phone || !form.password) {
      toast.error("Please fill in both fields.");
      return;
    }

    const normalizedPhone = normalizePhoneNumber(form.phone);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: normalizedPhone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Invalid credentials.");
        return;
      }

      // ✅ Store token & user in Zustand
      setUser(data.user, data.token);

      // Optional: persist token in localStorage (if needed)
      localStorage.setItem("token", data.token);
      localStorage.setItem("phone", normalizedPhone);

      if (data.forcePasswordChange) {
        toast("⚠️ Please change your password before continuing.", {
          icon: "🔑",
          duration: 3000,
        });
        router.push("/change-password");
      } else if (data.step === "verify-otp") {
        // ✅ Handle OTP flow if backend requires verification
        toast.success("OTP sent! Please verify.");
        router.push("/verify-otp");
      } else {
        toast.success("✅ Login successful! Redirecting...", { duration: 1500 });
        setTimeout(() => router.push("/portal"), 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("🚨 Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4"
      style={{
        background: `linear-gradient(135deg, ${THEME.COLORS.gradientPrimary[0]}, ${THEME.COLORS.gradientPrimary[1]})`,
        fontFamily: THEME.FONT.regular,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Right Path Logo" width={80} height={80} />
        </div>

        <h1
          className="text-center text-3xl font-bold mb-6"
          style={{ color: THEME.COLORS.primary }}
        >
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <IoCallOutline className="text-gray-500 mr-2" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 0712345678"
                className="w-full focus:outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 relative">
              <IoLockClosedOutline className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOffOutline size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <IoLogInOutline size={20} />
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="text-center text-sm mt-4">
          Not yet our member?{" "}
          <Link href="/join-us" className="text-blue-600 underline">
            Join us now
          </Link>
        </div>

        <div className="text-center mt-3">
          <Link
            href="/forgot-password"
            className="text-gray-500 text-sm underline"
          >
            Forgot Password?
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
