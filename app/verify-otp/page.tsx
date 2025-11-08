"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // seconds

const VerifyOtpPage: React.FC = () => {
    const router = useRouter();
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const phone =
        typeof window !== "undefined" ? localStorage.getItem("phone") : "";

    // Auto-focus first input
    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    // Countdown timer
    useEffect(() => {
        if (resendTimer <= 0) return;
        const timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [resendTimer]);

    // ✅ Handle OTP input changes
    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return; // numbers only
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-move to next input
        if (value && index < OTP_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        // Auto-submit if all digits filled
        if (newOtp.every((v) => v !== "")) {
            verifyOtp(newOtp.join(""));
        }
    };

    // ✅ Backspace navigation
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // ✅ Verify OTP
    const verifyOtp = async (otpCode: string) => {
        if (!phone) {
            toast.error("Phone number missing. Please login again.");
            router.push("/login");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, otpCode }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success(data.message || "✅ Verified successfully!");
                // optional: clear otp
                setOtp(Array(OTP_LENGTH).fill(""));
                // redirect after delay
                setTimeout(() => router.push("/portal"), 1000);
            } else {
                toast.error(data.message || "Invalid OTP.");
                setOtp(Array(OTP_LENGTH).fill(""));
                inputsRef.current[0]?.focus();
            }
        } catch {
            toast.error("🚨 Network error. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Resend OTP
    const resendOtp = async () => {
        if (!phone) {
            toast.error("Phone missing. Please login again.");
            router.push("/login");
            return;
        }

        if (resendTimer > 0) return;

        try {
            const res = await fetch(`${API_URL}/api/auth/change-password/resend-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("OTP resent successfully!");
                setResendTimer(RESEND_COOLDOWN);
            } else {
                toast.error(data.message || "Failed to resend OTP.");
            }
        } catch {
            toast.error("🚨 Network error. Try again later.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
            <Toaster position="top-right" />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
            >
                <h1 className="text-center text-2xl font-bold mb-3">Verify OTP</h1>
                <p className="text-center mb-5 text-gray-600">
                    Enter the 6-digit code sent to your WhatsApp
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-between space-x-2 mb-4">
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            ref={(el) => {
                                inputsRef.current[i] = el!;
                            }}
                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                    ))}
                </div>

                {/* Resend Button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={resendOtp}
                    disabled={resendTimer > 0 || loading}
                    className={`w-full py-2 text-white font-semibold rounded-lg mb-3 transition ${resendTimer > 0 || loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {resendTimer > 0
                        ? `Resend OTP in ${resendTimer}s`
                        : "Resend OTP"}
                </motion.button>

                {loading && (
                    <p className="text-center mt-2 text-gray-500">Verifying...</p>
                )}
            </motion.div>
        </div>
    );
};

export default VerifyOtpPage;
