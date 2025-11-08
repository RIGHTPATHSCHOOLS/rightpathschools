"use client";

import { motion } from "framer-motion";
import {
  IoSchoolOutline,
  IoPeopleOutline,
  IoTrophyOutline,
  IoSparklesOutline,
  IoCalendarOutline,
  IoBookOutline,
  IoStarOutline,
  IoHomeOutline,
  IoStatsChartOutline,
  IoBriefcaseOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import THEME from "@/utils/theme";

/* ✨ Safe Counter Animation */
const Counter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (time: number) => {
            const progress = Math.min((time - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="text-4xl font-extrabold text-blue-700">
      {count.toLocaleString()}
    </span>
  );
};

const AboutPage = () => {
  const highlights = [
    {
      icon: IoSchoolOutline,
      title: "Quality Education",
      desc: "We provide flexible, accessible learning programs tailored for adult and private candidates, ensuring no learner is left behind.",
      color: THEME.COLORS.primary,
    },
    {
      icon: IoPeopleOutline,
      title: "Dedicated Mentorship",
      desc: "Our educators guide learners with empathy, discipline, and a results-driven approach to academic and personal success.",
      color: THEME.COLORS.secondary,
    },
    {
      icon: IoTrophyOutline,
      title: "Proven Excellence",
      desc: "Right Path Schools has empowered hundreds of learners to achieve their academic dreams through affordable, high-impact programs.",
      color: THEME.COLORS.accent,
    },
  ];

  const missionVision = [
    {
      title: "Our Mission",
      text: "To empower adults and private candidates in Kenya to achieve academic excellence through flexible, affordable, and high-quality education.",
    },
    {
      title: "Our Vision",
      text: "To be Kenya’s leading center for adult and private education — shaping futures, transforming lives, and unlocking potential.",
    },
  ];

  const journey = [
    {
      year: "2019",
      title: "Founded in Nairobi",
      desc: "Right Path Schools opened its doors with the vision to make quality education accessible to adults and private candidates.",
      icon: IoHomeOutline,
      color: THEME.COLORS.primary,
    },
    {
      year: "2020",
      title: "First 100 Students",
      desc: "We reached our first major milestone by enrolling over 100 adult learners across various academic programs.",
      icon: IoPeopleOutline,
      color: THEME.COLORS.secondary,
    },
    {
      year: "2022",
      title: "Expansion & Recognition",
      desc: "Our Nairobi branch expanded to serve learners nationwide through blended learning options and digital platforms.",
      icon: IoBookOutline,
      color: THEME.COLORS.accent,
    },
    {
      year: "2024",
      title: "National Impact",
      desc: "Right Path Schools became a recognized leader in adult education, helping hundreds of learners achieve KCSE success and beyond.",
      icon: IoStarOutline,
      color: "#f59e0b",
    },
  ];

  const stats = [
    { label: "Learners Empowered", value: 893, icon: IoPeopleOutline, color: THEME.COLORS.primary },
    { label: "Exam Success Rate", value: 73, icon: IoTrophyOutline, color: THEME.COLORS.secondary, suffix: "%" },
    { label: "Years of Excellence", value: 6, icon: IoCalendarOutline, color: THEME.COLORS.accent },
    { label: "Courses Offered", value: 15, icon: IoStatsChartOutline, color: "#16a34a" },
  ];

  const team = [
    {
      name: "Mr. Dominic O.",
      role: "Director & Founder",
      desc: "Visionary leader driving Right Path Schools’ mission of empowering learners through accessible education.",
      img: "/team/director.jpeg",
      color: THEME.COLORS.primary,
    },
    {
      name: "Ms. Faith N.",
      role: "Head of Academics",
      desc: "Dedicated to ensuring academic excellence and quality curriculum delivery for all learners.",
      img: "/team/academics.jpeg",
      color: THEME.COLORS.secondary,
    },
    {
      name: "Mr. Peter L.",
      role: "ICT & E-Learning Lead",
      desc: "Championing technology-driven education to make flexible learning possible for all students.",
      img: "/team/ict.jpeg",
      color: THEME.COLORS.accent,
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center p-5 md:p-10"
      style={{
        background: `linear-gradient(135deg, ${THEME.COLORS.gradientBackground.join(",")})`,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-3"
          style={{
            color: THEME.COLORS.primaryDark,
            fontFamily: THEME.FONT.bold,
            textShadow: `2px 2px 12px ${THEME.COLORS.secondary}55`,
          }}
        >
          About Right Path Schools
        </h1>
        <p className="text-base md:text-lg text-gray-700" style={{ fontFamily: THEME.FONT.regular }}>
          At <strong>Right Path Schools</strong>, we believe education is the foundation for lifelong growth.
          We empower{" "}
          <span className="text-blue-700 font-medium">adults and private candidates</span> across Kenya through
          flexible, supportive, and high-quality programs designed for modern learners.
        </p>
      </motion.div>

      {/* Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-6xl"
      >
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: `${item.color}22` }}>
              <item.icon size={34} color={item.color} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center" style={{ color: item.color }}>
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm text-center leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission & Vision */}
      <div className="mt-16 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {missionVision.map((mv, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg border-t-4"
            whileHover={{ y: -5 }}
            style={{ borderColor: i === 0 ? THEME.COLORS.primary : THEME.COLORS.secondary }}
          >
            <h3 className="text-2xl font-bold mb-3" style={{ color: i === 0 ? THEME.COLORS.primaryDark : THEME.COLORS.secondary }}>
              {mv.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{mv.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-20 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-10" style={{ color: THEME.COLORS.primaryDark }}>
          Our Impact in Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full" style={{ backgroundColor: `${stat.color}22` }}>
                <stat.icon size={28} color={stat.color} />
              </div>
              <Counter target={stat.value} />
              <p className="text-sm text-gray-600 font-medium mt-2">
                {stat.label} {stat.suffix || ""}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="mt-20 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: THEME.COLORS.primaryDark }}>
          Our Journey
        </h2>
        <div className="relative border-l-4 border-blue-200 ml-6">
          {journey.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="mb-10 ml-6"
            >
              <span className="absolute -left-5 flex items-center justify-center w-10 h-10 rounded-full shadow-md" style={{ backgroundColor: `${step.color}22` }}>
                <step.icon size={22} color={step.color} />
              </span>
              <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold" style={{ color: step.color }}>
                  {step.year} — {step.title}
                </h3>
                <p className="text-gray-700 text-sm mt-1">{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 👥 Meet Our Team */}
      <div className="mt-20 max-w-6xl w-full text-center">
        <h2 className="text-3xl font-bold mb-12" style={{ color: THEME.COLORS.primaryDark }}>
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4"
                   style={{ borderColor: member.color }}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold" style={{ color: member.color }}>
                {member.name}
              </h3>
              <p className="text-gray-600 text-sm font-medium mb-2">{member.role}</p>
              <p className="text-gray-700 text-sm">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-16 text-center"
      >
        <motion.div
          className="inline-block bg-white rounded-full shadow-md px-8 py-4 hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center gap-3 text-gray-800 font-semibold">
            <IoSparklesOutline size={22} color={THEME.COLORS.accent} className="animate-pulse" />
            <p>“Empowering Learners. Transforming Lives. Creating Opportunities.”</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
