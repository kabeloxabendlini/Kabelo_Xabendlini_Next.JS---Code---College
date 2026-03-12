"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const logoRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (logoRef.current && !logoRef.current.contains(target)) setLogoOpen(false);
      if (aboutRef.current && !aboutRef.current.contains(target)) setAboutOpen(false);
      if (moreRef.current && !moreRef.current.contains(target)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar bg-gray-900 shadow-sm px-6 py-3 text-white">

      {/* Logo / Brand Dropdown */}
      <div className="flex-1 relative" ref={logoRef}>
        <button
          onClick={() => setLogoOpen(!logoOpen)}
          className="btn btn-ghost text-2xl font-bold flex items-center gap-1 text-white"
        >
          MySite
          <svg
            className={`w-4 h-4 transform transition-transform ${logoOpen ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {logoOpen && (
          <ul className="absolute left-0 mt-2 w-44 bg-gray-800 rounded-md shadow-lg py-2 z-50">
            <li>
              <Link href="/profile" className="block px-4 py-2 hover:bg-primary/20 transition text-white">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="block px-4 py-2 hover:bg-primary/20 transition text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/logout" className="block px-4 py-2 hover:bg-red-500/20 text-red-400 transition">
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="flex-none hidden md:flex items-center space-x-6 text-white">
        <Link href="/" className="hover:text-primary transition text-white">
          Home
        </Link>

        {/* About Dropdown */}
        <div className="relative" ref={aboutRef}>
          <button
            onClick={() => setAboutOpen(!aboutOpen)}
            className="hover:text-primary transition flex items-center gap-1 text-white"
          >
            About
            <svg
              className={`w-4 h-4 transform transition-transform ${aboutOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {aboutOpen && (
            <ul className="absolute mt-2 w-44 bg-gray-800 rounded-md shadow-lg py-2 z-50">
              <li>
                <Link href="/about" className="block px-4 py-2 hover:bg-primary/20 transition text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/githubusers" className="block px-4 py-2 hover:bg-primary/20 transition text-white">
                  GitHub Users
                </Link>
              </li>
              <li>
                <Link href="/about/contact" className="block px-4 py-2 hover:bg-primary/20 transition text-white">
                  Contact
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* More Dropdown */}
        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="hover:text-primary transition flex items-center gap-1 text-white"
          >
            More
            <svg
              className={`w-4 h-4 transform transition-transform ${moreOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {moreOpen && (
            <ul className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-md shadow-lg py-2 z-50">
              <li>
                <Link href="/blog" className="block px-4 py-2 hover:bg-primary/20 transition text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/services" className="block px-4 py-2 hover:bg-primary/20 transition text-white">
                  Services
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

    </nav>
  );
}