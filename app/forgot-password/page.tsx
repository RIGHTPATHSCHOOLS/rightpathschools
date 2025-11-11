"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import THEME from "@/utils/theme";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Normalize phone number → "2547xxxxxxx"
  const normalizePhoneNumber = (raw: string): string => {
    let phone = raw.trim().replace(/\D/g, ""); // Remove non-digits
    if (phone.startsWith("+254")) {
      phone = "254" + phone.slice(4);
    } else if (phone.startsWith("0")) {
      phone = "254" + phone.slice(1);
    } else if (phone.startsWith("7")) {
      phone = "254" + phone;
    }
    return phone;
  };

  const handleSubmit = async () => {
    if (!phone) {
      toast.error("Phone number is required");
      return;
    }

    const normalized = normalizePhoneNumber(phone);
    if (!/^2547\d{8}$/.test(normalized)) {
      toast.error("Invalid phone number format");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP sent! Check your WhatsApp messages.");
        router.push(`/verify-forgot-password?phone=${normalized}`);
      } else {
        toast.error(data.message || "Error sending OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6"
      style={{ backgroundColor: THEME.COLORS.backgroundLight }}
    >
      <Toaster position="top-center" />

      {/* 🔹 Logo Section */}
      <div className="flex flex-col items-center mb-8">
        <p
          className="text-2xl font-bold"
          style={{ color: THEME.COLORS.primary, fontFamily: THEME.FONT.bold }}
        >
          Rightpath Schools
        </p>
        <div className="relative w-24 h-24 mt-3">
          <Image
            src="/logo.png"
            alt="Rightpath Schools Logo"
            fill
            className="object-contain rounded-full"
          />
        </div>
      </div>

      {/* 🔹 Header */}
      <div className="relative mb-6 text-center">
        <button
          onClick={() => router.back()}
          className="absolute left-0 text-2xl text-blue-600 hover:text-blue-800"
        >
          ←
        </button>
        <h1
          className="text-xl font-bold"
          style={{ color: THEME.COLORS.primary }}
        >
          Enter Phone Number
        </h1>
      </div>

      {/* 🔹 Form */}
      <div className="w-full max-w-md">
        <input
          type="tel"
          placeholder="Enter your phone (e.g. 0712345678)"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
          style={{
            backgroundColor: loading
              ? THEME.COLORS.disabled
              : THEME.COLORS.primary,
          }}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
}
