import Link from "next/link";
import { HandMetal } from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher";
import { translateText } from "@/lib/translate";
import { cookies } from "next/headers";

const navbarLinks = [
  { name: "Lessons", href: "/lessons" },
  { name: "Practice", href: "/practice" },
  { name: "Sign Jam", href: "/jam" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Profile", href: "/profile" },
];

const Navbar = async () => {
  const store = await cookies();

  const locale = store.get("locale")?.value || "en";

  const translatedLinks = await Promise.all(
    navbarLinks.map((link) => ({
      ...link,
      name: translateText(link.name, locale),
    })),
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-gray-900/80  backdrop-blur-sm  shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-indigo-400"
          >
            <HandMetal size={28} />
            {await translateText("SignEdu", locale)}
          </Link>
          <div className="flex items-center justify-between gap-6">
            {translatedLinks.map((link, _) => (
              <Link key={_} href={link.href}>
                <span>{link.name}</span>
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
