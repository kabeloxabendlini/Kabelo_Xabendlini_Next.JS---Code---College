import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js DaisyUI App",
  description: "Next.js + Tailwind + DaisyUI example",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body 
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children} {/* ThemeToggle stays inside page.tsx navbar */}
      </body>
    </html>
  );
}

// "use client"; // needed if you include hooks/components like ThemeToggle

// import type { ReactNode } from "react";
// import "./globals.css";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en" data-theme="light">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {children} {/* ThemeToggle stays inside navbar per page */}
//       </body>
//     </html>
//   );
// }