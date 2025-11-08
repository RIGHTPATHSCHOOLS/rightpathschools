"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  IoLockClosedOutline,
  IoKeyOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ChangePasswordPage: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState<string | null>("");

  // 👁️ Toggles for password visibility
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    if (storedPhone) {
      setPhone(storedPhone);
    } else {
      toast.error("⚠️ Missing phone number. Please log in again.");
      setTimeout(() => router.push("/login"), 2000);
    }

    console.log("API_URL:", API_URL);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (!phone) {
      toast.error("Phone number missing. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok && data.success && data.step === "verify-otp") {
        toast.success("✅ OTP sent! Please verify on WhatsApp.");
        localStorage.setItem("phone", phone);
        setTimeout(() => router.push("/verify-otp"), 1500);
      } else {
        toast.error(data.message || "Failed to initiate password change.");
      }
    } catch (err) {
      console.error(err);
      toast.error("🚨 Network error. Try again later.");
    } finally {
      setLoading(false);
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
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Old Password */}
          <PasswordField
            label="Old Password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            show={showOld}
            toggleShow={() => setShowOld((p) => !p)}
            icon={<IoLockClosedOutline className="text-gray-500 mr-2" />}
          />

          {/* New Password */}
          <PasswordField
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            show={showNew}
            toggleShow={() => setShowNew((p) => !p)}
            icon={<IoKeyOutline className="text-gray-500 mr-2" />}
          />

          {/* Confirm Password */}
          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            show={showConfirm}
            toggleShow={() => setShowConfirm((p) => !p)}
            icon={<IoKeyOutline className="text-gray-500 mr-2" />}
          />

          {/* Submit */}
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
            {loading ? "Sending OTP..." : "Change Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

// Reusable password input field
const PasswordField = ({
  label,
  name,
  value,
  onChange,
  show,
  toggleShow,
  icon,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  toggleShow: () => void;
  icon: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 relative focus-within:ring-2 focus-within:ring-blue-500">
      {icon}
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full focus:outline-none"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-3 text-gray-500 hover:text-gray-700"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
      </button>
    </div>
  </div>
);

export default ChangePasswordPage;
