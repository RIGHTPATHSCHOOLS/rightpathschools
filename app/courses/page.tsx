"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IoSchoolOutline,
  IoEarthOutline,
  IoLanguageOutline,
  IoLaptopOutline,
} from "react-icons/io5";
import THEME from "@/utils/theme";

const CoursesPage = () => {
  const router = useRouter();

  const courses = [
    {
      title: "KCSE PRIVATE CANDIDATES",
      description:
        "Enroll as a private candidate and unlock your academic potential through personalized study programs.",
      image: "/images/kcse.png",
      icon: IoSchoolOutline,
      color: THEME.COLORS.primary,
      route: "/requirements/kcse",
    },
    {
      title: "IGCSE PRIVATE CANDIDATES",
      description:
        "Internationally recognized curriculum offering flexibility and excellence for global learners.",
      image: "/images/igcse.png",
      icon: IoEarthOutline,
      color: THEME.COLORS.secondary,
      route: "/requirements/igcse",
    },
    {
      title: "LANGUAGES",
      description:
        "Master Kiswahili, English, and Foreign Languages like French at Right Path Schools.",
      image: "/images/languages.png",
      icon: IoLanguageOutline,
      color: THEME.COLORS.accent,
      route: "/requirements/languages",
    },
    {
      title: "ICT PROGRAMS",
      description:
        "Learn vital ICT skills and prepare for the digital future with certified and practical training.",
      image: "/images/ict.jpg",
      icon: IoLaptopOutline,
      color: THEME.COLORS.info,
      route: "/requirements/ict",
    },
  ];

  return (
    <div
      className="min-h-screen p-5 md:p-10"
      style={{
        background: `linear-gradient(135deg, ${THEME.COLORS.gradientBackground.join(",")})`,
      }}
    >
      {/* 🏫 Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1
          className="text-3xl md:text-5xl font-bold"
          style={{ color: THEME.COLORS.primary }}
        >
          Our Academic Courses
        </h1>
        <h3
          className="text-lg md:text-xl mt-3 font-medium"
          style={{ color: THEME.COLORS.textGray }}
        >
          Explore programs designed to shape your success.
        </h3>
      </motion.div>

      {/* 🎓 Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.map((course, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(course.route)}
            className="relative rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
          >
            {/* 📸 Course Image */}
            <Image
              src={course.image}
              alt={course.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* 🌈 Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
              style={{ backgroundColor: `${course.color}33` }}
            ></div>

            {/* ✍️ Text Content */}
            <div className="absolute bottom-0 p-5 text-white z-10">
              <div className="flex items-center gap-3 mb-2">
                <course.icon size={30} color={course.color} />
                <h2 className="text-lg md:text-xl font-semibold">
                  {course.title}
                </h2>
              </div>
              <p className="text-sm md:text-base text-gray-200 line-clamp-2">
                {course.description}
              </p>
            </div>

            {/* 🎨 Hover Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{
                background: `radial-gradient(circle at center, ${course.color}33, transparent 70%)`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
