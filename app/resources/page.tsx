"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IoBookOutline,
  IoCloudDownloadOutline,
  IoCalendarOutline,
  IoLaptopOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import THEME from "@/utils/theme";
import Image from "next/image";

// ✅ Define proper types
type FileResource = { title: string; file: string; type: string };
type LinkResource = { title: string; link: string; type: string };
type ResourceItem = FileResource | LinkResource;

interface ResourceSection {
  title: string;
  icon: any;
  color: string;
  description: string;
  items: ResourceItem[];
  image: string;
}

// ✅ Use the type
const resourceSections: ResourceSection[] = [
  {
    title: "Study Materials",
    icon: IoBookOutline,
    color: THEME.COLORS.primary,
    description:
      "Access KCSE, IGCSE, Languages, and ICT revision materials designed for excellence.",
    items: [
      { title: "KCSE Mathematics Revision Papers (2023)", file: "/resources/kcse-maths.pdf", type: "PDF" },
      { title: "IGCSE English Practice Tests", file: "/resources/igcse-english.pdf", type: "PDF" },
      { title: "ICT Fundamentals - Notes", file: "/resources/ict-notes.pdf", type: "PDF" },
    ],
    image: "/banner/img1.png",
  },
  {
    title: "Downloads",
    icon: IoCloudDownloadOutline,
    color: THEME.COLORS.secondary,
    description: "Official school documents available for viewing and download.",
    items: [
      { title: "Admission Form", file: "/downloads/admission-form.pdf", type: "PDF" },
      { title: "School Prospectus", file: "/downloads/prospectus.pdf", type: "PDF" },
      { title: "Fee Structure", file: "/downloads/fees.pdf", type: "PDF" },
    ],
    image: "/banner/img4.png",
  },
  {
    title: "Academic Timetables",
    icon: IoCalendarOutline,
    color: THEME.COLORS.accent,
    description: "Stay up to date with all academic activities, exam weeks, and school events.",
    items: [
      { title: "KCSE Exam Timetable (2025)", file: "/downloads/kcse-timetable.pdf", type: "PDF" },
      { title: "IGCSE Exam Schedule", file: "/downloads/igcse-timetable.pdf", type: "PDF" },
    ],
    image: "/banner/img6.png",
  },
  {
    title: "Digital Tools & Portals",
    icon: IoLaptopOutline,
    color: THEME.COLORS.info,
    description:
      "Access our online classes, student portal, and e-learning platforms.",
    items: [
      { title: "Online Classes Portal", link: "https://rightpathschools.site/online", type: "Web" },
      { title: "Student Portal", link: "https://rightpathschools.site/portal", type: "Web" },
      { title: "E-Library Access", link: "https://rightpathschools.site/library", type: "Web" },
    ],
    image: "/banner/img5.png",
  },
];

const ResourcesPage: React.FC = () => {
  return (
    <div
      className="min-h-screen p-4 md:p-10"
      style={{
        background: `linear-gradient(135deg, ${THEME.COLORS.gradientBackground.join(",")})`,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1
          className="text-3xl md:text-5xl font-bold"
          style={{ color: THEME.COLORS.primary, fontFamily: THEME.FONT.bold }}
        >
          School Resources
        </h1>
        <p
          className="text-gray-700 mt-3 text-base md:text-lg"
          style={{ fontFamily: THEME.FONT.regular }}
        >
          Access official materials, study resources, and essential school downloads anytime.
        </p>
      </motion.div>

      {/* Resource Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {resourceSections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg bg-white"
          >
            <div className="relative w-full h-48">
              <Image src={section.image} alt={section.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <section.icon size={30} color={section.color} />
                <h2
                  className="text-xl md:text-2xl font-semibold text-white"
                  style={{ fontFamily: THEME.FONT.semiBold }}
                >
                  {section.title}
                </h2>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4 text-sm md:text-base">{section.description}</p>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition"
                  >
                    <span className="text-gray-800 text-sm md:text-base">{item.title}</span>
                    {"file" in item ? (
                      <a
                        href={item.file}
                        download
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Download
                      </a>
                    ) : (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 font-medium text-sm"
                      >
                        Open
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <div
          className="inline-flex items-center gap-3 bg-white shadow-md rounded-2xl px-6 py-4"
          style={{ border: `1px solid ${THEME.COLORS.border}` }}
        >
          <IoChatbubbleEllipsesOutline size={28} color={THEME.COLORS.primary} />
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Need a resource you can’t find?</h3>
            <p className="text-gray-600 text-sm">Contact us to request additional materials.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResourcesPage;
