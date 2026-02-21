"use client";

import Link from "next/link";
import { HandMetal } from "lucide-react";
import LanguageSwitcher from "../shared/LanguageSwitcher";
import T from "../shared/T";

const navbarLinks = [
  { name: "Lessons", href: "/lessons" },
  { name: "Practice", href: "/practice" },
  { name: "Sign Jam", href: "/jam" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Profile", href: "/profile" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-gray-900/80  backdrop-blur-sm  shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-indigo-400"
          >
            <HandMetal size={28} />
            <T text={"SignEdu"} />
          </Link>
          <div className="flex items-center justify-between gap-6">
            {navbarLinks.map((link, _) => (
              <Link key={_} href={link.href}>
                <T text={link.name} />
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
