export const LANGUAGES = [
  { code: "en" as const, label: "English",    flag: "🇺🇸", region: "Global" },
  { code: "ja" as const, label: "日本語",      flag: "🇯🇵", region: "Japan" },
  { code: "es" as const, label: "Español",    flag: "🇪🇸", region: "Spain" },
  { code: "fr" as const, label: "Français",   flag: "🇫🇷", region: "France" },
  { code: "de" as const, label: "Deutsch",    flag: "🇩🇪", region: "Germany" },
  { code: "ar" as const, label: "العربية",    flag: "🇸🇦", region: "Arabic" },
  { code: "zh" as const, label: "中文",        flag: "🇨🇳", region: "China" },
  { code: "pt" as const, label: "Português",  flag: "🇧🇷", region: "Brazil" },
  { code: "ko" as const, label: "한국어",      flag: "🇰🇷", region: "Korea" },
  { code: "hi" as const, label: "हिन्दी",     flag: "🇮🇳", region: "India" },
  { code: "it" as const, label: "Italiano",   flag: "🇮🇹", region: "Italy" },
  { code: "ru" as const, label: "Русский",    flag: "🇷🇺", region: "Russia" },
];

export const FEATURES = [
  { label: "Lessons",     href: "/lessons",     emoji: "📖" },
  { label: "Practice",    href: "/practice",    emoji: "📷" },
  { label: "Sign Jam",    href: "/jam",         emoji: "🎸" },
  { label: "Leaderboard", href: "/leaderboard", emoji: "🏆" },
  { label: "Profile",     href: "/profile",     emoji: "👤" },
];

export const TECH = [
  { label: "Next.js",    href: "https://nextjs.org",     color: "text-white" },
  { label: "MediaPipe",  href: "https://mediapipe.dev",  color: "text-green-400" },
  { label: "Lingo.dev",  href: "https://lingo.dev",      color: "text-indigo-400" },
  { label: "Pusher",     href: "https://pusher.com",     color: "text-purple-400" },
  { label: "Vercel",     href: "https://vercel.com",     color: "text-gray-300" },
];

export const BADGE_META: Record<string, { label: string; emoji: string; desc: string }> = {
  first_sign:       { emoji: "🌱", label: "First Sign",       desc: "Learned your first sign" },
  sign_rookie:      { emoji: "🤙", label: "Sign Rookie",      desc: "Learned 10 signs" },
  sign_pro:         { emoji: "🖐️", label: "Sign Pro",         desc: "Learned 25 signs" },
  sign_master:      { emoji: "🏆", label: "Sign Master",      desc: "Learned 50 signs" },
  first_lesson:     { emoji: "📖", label: "First Lesson",     desc: "Completed your first lesson" },
  lesson_hat_trick: { emoji: "🎩", label: "Hat Trick",        desc: "Completed 3 lessons" },
  jammer:           { emoji: "🎸", label: "Jammer",           desc: "Sent your first sign in a Jam" },
  jam_master:       { emoji: "🎤", label: "Jam Master",       desc: "Sent 20 signs in Jam rooms" },
  century:          { emoji: "💯", label: "Century",          desc: "Reached 100 points" },
  legend:           { emoji: "⭐", label: "Legend",           desc: "Reached 500 points" },
};