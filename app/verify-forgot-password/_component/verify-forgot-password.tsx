"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import THEME from "@/utils/theme";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function VerifyForgotPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!otp || !newPassword) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otpCode: otp, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successful!");
        setTimeout(() => router.push("/login"), 1200);
      } else {
        toast.error(data.message || "Error resetting password");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-6 bg-gray-50"
      style={{ backgroundColor: THEME.COLORS.backgroundLight }}
    >
      <Toaster position="top-center" />

      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: THEME.COLORS.primary, fontFamily: THEME.FONT.bold }}
        >
          Reset Password
        </h1>
        <p
          className="text-base"
          style={{
            color: THEME.COLORS.secondary,
            fontFamily: THEME.FONT.regular,
          }}
        >
          Enter the OTP sent to{" "}
          <span className="font-semibold">{phone}</span> on WhatsApp and your
          new password below.
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-md">
        {/* OTP */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          style={{
            backgroundColor: loading
              ? THEME.COLORS.disabled
              : THEME.COLORS.primary,
          }}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
