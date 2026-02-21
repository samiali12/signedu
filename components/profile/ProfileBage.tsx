import { BADGE_META } from "@/constant/constant";

interface ProfileBageProps {
  id: string;
  earned: boolean;
}

const ProfileBage = ({ id, earned }: ProfileBageProps) => {
  const meta = BADGE_META[id];
  if (!meta) return null;
  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition
      ${
        earned
          ? "bg-indigo-950 border-indigo-700"
          : "bg-gray-900 border-gray-800 opacity-40 grayscale"
      }`}
    >
      <span className="text-3xl">{meta.emoji}</span>
      <p className="text-white text-xs font-bold">{meta.label}</p>
      <p className="text-gray-500 text-xs">{meta.desc}</p>
    </div>
  );
};

export default ProfileBage;
