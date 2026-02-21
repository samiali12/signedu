import React from "react";
import T from "../shared/T";

interface ProfileStatsCard {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}

const ProfileStatsCard = ({
  icon: Icon,
  label,
  value,
  color,
}: ProfileStatsCard) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-3">
      <div
        className={`${color} w-10 h-10 rounded-xl flex items-center justify-center`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-white">{value}</p>
        <p className="text-gray-400 text-sm">
          <T text={label} />
        </p>
      </div>
    </div>
  );
};

export default ProfileStatsCard;
