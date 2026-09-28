import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MahaSkill AI | Government of Maharashtra LMI & Curriculum Alignment",
  description:
    "Labor Market Intelligence (LMI) & curriculum-alignment platform for Maharashtra State Innovation Society (MSInS) and DVET bridging ITIs and dynamic industry demand.",
  keywords: [
    "MahaSkill AI",
    "Government of Maharashtra",
    "MSInS",
    "DVET",
    "LMI",
    "Labor Market Intelligence",
    "Curriculum Alignment",
    "ITI",
    "Skill Development",
    "Pune EV",
    "Maharashtra Skill Development",
  ],
  authors: [{ name: "Maharashtra State Innovation Society" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className={`${inter.className} min-h-screen text-slate-900 antialiased flex flex-col`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
