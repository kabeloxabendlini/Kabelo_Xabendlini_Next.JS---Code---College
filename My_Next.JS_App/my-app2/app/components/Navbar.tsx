"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Refs for dropdowns
  const logoRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (logoRef.current && !logoRef.current.contains(target)) {
        setLogoOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(target)) {
        setAboutOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(target)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm px-6 py-3">
      {/* Logo / Brand with Dropdown */}
      <div className="flex-1 relative" ref={logoRef}>
        <button
          onClick={() => setLogoOpen(!logoOpen)}
          className="btn btn-ghost text-2xl font-bold flex items-center gap-1"
        >
          MySite
          <svg
            className={`w-4 h-4 transform transition-transform ${
              logoOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {logoOpen && (
          <ul className="absolute left-0 mt-2 w-44 bg-base-100 rounded-md shadow-lg py-2 z-50">
            <li>
              <Link href="/profile" className="block px-4 py-2 hover:bg-primary/20 transition">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="block px-4 py-2 hover:bg-primary/20 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/logout" className="block px-4 py-2 hover:bg-red-500/20 text-red-600 transition">
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="flex-none hidden md:flex items-center space-x-6">
        <Link href="/" className="hover:text-primary transition">
          Home
        </Link>

        {/* About Dropdown */}
        <div className="relative" ref={aboutRef}>
          <button
            onClick={() => setAboutOpen(!aboutOpen)}
            className="hover:text-primary transition flex items-center gap-1"
          >
            About
            <svg
              className={`w-4 h-4 transform transition-transform ${
                aboutOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {aboutOpen && (
            <ul className="absolute mt-2 w-44 bg-base-100 rounded-md shadow-lg py-2 z-50">
              <li>
                <Link href="/about" className="block px-4 py-2 hover:bg-primary/20 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/about/contact" className="block px-4 py-2 hover:bg-primary/20 transition">
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
            className="hover:text-primary transition flex items-center gap-1"
          >
            More
            <svg
              className={`w-4 h-4 transform transition-transform ${
                moreOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {moreOpen && (
            <ul className="absolute right-0 mt-2 w-44 bg-base-100 rounded-md shadow-lg py-2 z-50">
              <li>
                <Link href="/blog" className="block px-4 py-2 hover:bg-primary/20 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/services" className="block px-4 py-2 hover:bg-primary/20 transition">
                  Services
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="flex-none md:hidden">
        <details className="dropdown dropdown-end">
          <summary className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 space-y-1">
            <li>
              <Link href="/">Home</Link>
            </li>

            {/* Mobile About Dropdown */}
            <li>
              <details>
                <summary>About</summary>
                <ul className="bg-base-100 rounded-t-none p-2 w-44 space-y-1">
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/about/contact">Contact</Link>
                  </li>
                </ul>
              </details>
            </li>

            {/* Mobile More Dropdown */}
            <li>
              <details>
                <summary>More</summary>
                <ul className="bg-base-100 rounded-t-none p-2 w-44 space-y-1">
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link href="/services">Services</Link>
                  </li>
                </ul>
              </details>
            </li>

            {/* Mobile MySite Dropdown */}
            <li>
              <details>
                <summary>MySite</summary>
                <ul className="bg-base-100 rounded-t-none p-2 w-44 space-y-1">
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link href="/logout" className="text-red-600">
                      Logout
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
}