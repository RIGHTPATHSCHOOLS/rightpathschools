"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IoPersonOutline,
  IoCallOutline,
  IoSchoolOutline,
  IoBookOutline,
  IoArrowBack,
  IoArrowForward,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import THEME from "@/utils/theme";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ---------------- TYPES ----------------
interface FormData {
  surname: string;
  lastName: string;
  middleName: string;
  gender: string;
  dateOfBirth: string;
  idNumber: string;
  nationality: string;
  phone: string;
  email: string;
  address: string;
  county: string;
  previousSchool: string;
  educationLevel: string;
  yearCompleted: string;
  examScore: string;
  course: string;
  modeOfStudy: string;
  intakeMonth: string;
  intakeYear: string;
  agree: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const JoinUsForm: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [form, setForm] = useState<FormData>({
    surname: "",
    lastName: "",
    middleName: "",
    gender: "",
    dateOfBirth: "",
    idNumber: "",
    nationality: "Kenya",
    phone: "",
    email: "",
    address: "",
    county: "",
    previousSchool: "",
    educationLevel: "",
    yearCompleted: "",
    examScore: "",
    course: "",
    modeOfStudy: "",
    intakeMonth: "",
    intakeYear: "",
    agree: false,
  });

  // ---------------- VALIDATION ----------------
  const validateField = (name: string, value: string): string => {
    if (name === "middleName") return "";

    if (!value.trim() && name !== "agree" && name !== "email")
      return "This field is required.";

    if (["surname", "lastName"].includes(name) && !/^[A-Za-z\s'-]+$/.test(value))
      return "Only letters allowed.";

    if (["idNumber", "yearCompleted", "examScore", "intakeYear"].includes(name) && !/^\d+$/.test(value))
      return "Only numbers allowed.";

    if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Enter a valid email address.";

    if (name === "phone" && !/^(?:\+?254|0)?7\d{8}$/.test(value))
      return "Enter a valid Kenyan phone (e.g. 0712345678)";

    if (name === "dateOfBirth" && value) {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();
      const realAge = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? age : age - 1;
      if (realAge < 18) return "You must be at least 18 years old.";
    }

    if (name === "agree" && !form.agree)
      return "You must agree to continue.";

    return "";
  };

  const validateStep = (): boolean => {
    const stepFields: Record<number, string[]> = {
      1: ["surname", "lastName", "gender", "dateOfBirth", "idNumber", "nationality"],
      2: ["phone", "email", "address", "county"],
      3: ["previousSchool", "educationLevel", "yearCompleted", "examScore"],
      4: ["course", "modeOfStudy", "intakeMonth", "intakeYear"],
      5: ["agree"],
    };

    const fields = stepFields[step];
    const newErrors: ValidationErrors = {};
    fields.forEach((f) => {
      const error = validateField(f, form[f as keyof FormData]?.toString() || "");
      if (error) newErrors[f] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- HANDLE CHANGE ----------------
 const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const target = e.target;
  const { name, value, type } = target;

  const isCheckbox = type === "checkbox";
  const checked = isCheckbox && (target as HTMLInputElement).checked;

  // Only allow numbers for specific fields
  if (
    ["idNumber", "yearCompleted", "examScore", "intakeYear", "phone"].includes(name) &&
    value &&
    !/^\d*$/.test(value)
  )
    return;

  // Only allow letters for name fields
  if (
    ["surname", "lastName", "middleName"].includes(name) &&
    value &&
    !/^[A-Za-z\s'-]*$/.test(value)
  )
    return;

  setForm((prev) => ({
    ...prev,
    [name]: isCheckbox ? checked : value,
  }));

  const error = validateField(name, isCheckbox ? (checked ? "true" : "") : value);
  setErrors((prev) => ({ ...prev, [name]: error }));
};


  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
    else toast.error("⚠️ Please fix errors before proceeding.");
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep()) {
      toast.error("⚠️ Please correct all errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Registration successful! Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
        setForm({
          surname: "",
          lastName: "",
          middleName: "",
          gender: "",
          dateOfBirth: "",
          idNumber: "",
          nationality: "Kenya",
          phone: "",
          email: "",
          address: "",
          county: "",
          previousSchool: "",
          educationLevel: "",
          yearCompleted: "",
          examScore: "",
          course: "",
          modeOfStudy: "",
          intakeMonth: "",
          intakeYear: "",
          agree: false,
        });
        setStep(1);
      } else {
        toast.error(data.message || "❌ Something went wrong.");
      }
    } catch {
      toast.error("🚨 Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const stepTitles = [
    "Personal Info",
    "Contact Info",
    "Education Background",
    "Course Details",
    "Review & Agreement",
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // ---------------- RENDER ----------------
  return (
    <div
      className="min-h-screen flex justify-center items-start py-16 px-4 sm:px-6 md:px-12"
      style={{
        background: `linear-gradient(135deg, ${THEME.COLORS.gradientPrimary[0]}, ${THEME.COLORS.gradientPrimary[1]})`,
      }}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8"
        style={{ fontFamily: THEME.FONT.regular }}
      >
        <h1
          className="text-center text-3xl font-bold mb-8"
          style={{ color: THEME.COLORS.primary }}
        >
          Student Registration
        </h1>

        {/* Step Tracker */}
        <div className="flex items-center justify-between mb-8">
          {stepTitles.map((title, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  step > index
                    ? "bg-green-500"
                    : step === index + 1
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                {step > index ? <IoCheckmarkCircleOutline size={22} /> : index + 1}
              </div>
              <span className="text-xs mt-1 text-gray-600">{title}</span>
            </div>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              {/* Step 1 */}
              {step === 1 && (
                <FormSection icon={<IoPersonOutline />} title="Personal Information">
                  <Input name="surname" label="Surname" value={form.surname} onChange={handleChange} error={errors.surname} />
                  <Input name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} error={errors.lastName} />
                  <Input name="middleName" label="Middle Name (optional)" value={form.middleName} onChange={handleChange} />
                  <Select name="gender" label="Gender" value={form.gender} onChange={handleChange} options={["Male", "Female", "Other"]} error={errors.gender} />
                  <Input type="date" name="dateOfBirth" label="Date of Birth" value={form.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
                  <Input type="number" name="idNumber" label="ID Number" value={form.idNumber} onChange={handleChange} error={errors.idNumber} />
                </FormSection>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <FormSection icon={<IoCallOutline />} title="Contact Information">
                  <Input type="number" name="phone" label="Phone" value={form.phone} onChange={handleChange} error={errors.phone} />
                  <Input type="email" name="email" label="Email (optional)" value={form.email} onChange={handleChange} error={errors.email} />
                  <Input name="address" label="Residence" value={form.address} onChange={handleChange} error={errors.address} />
                  <Input name="county" label="County / Town" value={form.county} onChange={handleChange} error={errors.county} />
                </FormSection>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <FormSection icon={<IoSchoolOutline />} title="Education Background">
                  <Input name="previousSchool" label="Previous School" value={form.previousSchool} onChange={handleChange} error={errors.previousSchool} />
                  <Select name="educationLevel" label="Education Level" value={form.educationLevel} onChange={handleChange} options={["KCPE", "KCSE", "Diploma", "Certificate"]} error={errors.educationLevel} />
                  <Input type="number" name="yearCompleted" label="Year Completed" value={form.yearCompleted} onChange={handleChange} error={errors.yearCompleted} />
                  <Input type="number" name="examScore" label="Exam Score / Grade" value={form.examScore} onChange={handleChange} error={errors.examScore} />
                </FormSection>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <FormSection icon={<IoBookOutline />} title="Course Details">
                  <Select name="course" label="Course" value={form.course} onChange={handleChange} options={["KCSE", "IGCSE", "LANGUAGES", "ICT"]} error={errors.course} />
                  <Select name="modeOfStudy" label="Mode of Study" value={form.modeOfStudy} onChange={handleChange} options={["Early-Morning", "Day", "Weekend-Classes", "Evening", "Online"]} error={errors.modeOfStudy} />
                  <Select name="intakeMonth" label="Intake Month" value={form.intakeMonth} onChange={handleChange} options={months} error={errors.intakeMonth} />
                  <Input type="number" name="intakeYear" label="Intake Year" value={form.intakeYear} onChange={handleChange} error={errors.intakeYear} />
                </FormSection>
              )}

              {/* Step 5 */}
              {step === 5 && (
                <FormSection icon={<IoCheckmarkCircleOutline />} title="Review & Agreement">
                  <label className="flex items-center space-x-2 mt-4">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                      className="w-5 h-5 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{" "}
                      <Link href="/privacy-policy" className="text-blue-600 underline" target="_blank">
                        Terms and Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree}</p>}
                </FormSection>
              )}

              {/* Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button type="button" onClick={prevStep} disabled={loading} color="gray">
                    <IoArrowBack /> Back
                  </Button>
                )}
                {step < 5 ? (
                  <Button type="button" onClick={nextStep} disabled={loading} color="blue">
                    Next <IoArrowForward />
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading} color="green">
                    {loading ? "Submitting..." : <><IoCheckmarkCircleOutline /> Submit</>}
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

// ---------------- REUSABLE COMPONENTS ----------------
interface FormSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ icon, title, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-4 text-[#1E88E5]">
      {icon}
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  </div>
);

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border ${error ? "border-red-500" : "border-gray-300"} p-2 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:outline-none`}
      required={name !== "middleName" && name !== "email"}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  error?: string;
}

const Select: React.FC<SelectProps> = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border ${error ? "border-red-500" : "border-gray-300"} p-2 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:outline-none`}
      required
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

interface ButtonProps {
  type: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  color: "blue" | "gray" | "green";
}

const Button: React.FC<ButtonProps> = ({ type, onClick, children, disabled, color }) => {
  const colorClasses =
    color === "blue"
      ? "bg-blue-600 hover:bg-blue-700"
      : color === "green"
      ? "bg-green-600 hover:bg-green-700"
      : "bg-gray-400 hover:bg-gray-500";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-6 py-2 text-white font-semibold rounded-lg transition ${colorClasses} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default JoinUsForm;
