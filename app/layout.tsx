import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Right Path Schools | Centre for Private Candidates & Adult Learning",
  description:
    "Right Path Schools in Nairobi offers education for adults and private candidates. Learn, grow, and achieve with our supportive academic programs.",
  keywords: [
    "Right Path Schools",
    "Jacodemy",
    "adult education Kenya",
    "private candidates Nairobi",
    "KCSE private centre",
    "education in Kenya",
    "Right Path Centre",
  ],
  authors: [
    { name: "Domnic Otieno", url: "https://www.facebook.com/share/17LMh65sfF" },
    { name: "Jacodemy", url: "https://www.jacodemy.com" },
  ],
  creator: "Jacodemy",
  publisher: "Right Path Schools",
  openGraph: {
    title: "Right Path Schools – Empowering Private Candidates & Adult Learners",
    description:
      "Empowering learners through quality education for private candidates and adult learners in Nairobi, Kenya.",
    url: "https://rightpathschools.site", // ✅ remote site
    siteName: "Right Path Schools",
    locale: "en_KE",
    type: "website", // ✅ fixed (organization → website)
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Right Path Schools Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Right Path Schools | Education for Private Candidates",
    description:
      "Learn with Right Path Schools — Nairobi’s trusted centre for adult learners and private candidates.",
    creator: "@jacodemy", // update with your real Twitter if available
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://rightpathschools.site", // ✅ use your remote domain
  },
  metadataBase: new URL("https://rightpathschools.site"), // ✅ ensures all links resolve correctly
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    "facebook:page": "https://www.facebook.com/share/17LMh65sfF",
    "facebook:app_name": "Right Path Schools Centre for Private Candidates",
    "youtube:channel": "https://www.youtube.com/@jacodemy",
    "developer:organization": "Jacodemy",
    "developer:website": "https://www.jacodemy.com",
    "location": "Nairobi, Kenya",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F9FC]`}
      >
        {/* ✅ Sticky, modern header across all pages */}
        <Header />

        <main className="pt-16">{children}</main>
        <Toaster position="top-right" reverseOrder={false} />
        <Footer />
      </body>
    </html>
  );
}
