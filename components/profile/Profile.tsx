"use client";
import { useEffect, useState } from "react";
import { Star, Edit2, Check, BookOpen, Hand, Zap } from "lucide-react";
import useProgress from "@/hooks/useProgress";
import { BADGE_META } from "@/constant/constant";
import ProfileStatsCard from "./ProfileStatsCard";
import T from "../shared/T";
import { LESSONS } from "@/data/lesson";
import ProfileBage from "./ProfileBage";

const Profile = () => {
  const { progress, updateName } = useProgress();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(() => progress?.userName || "");

  function saveName() {
    if (nameInput.trim()) {
      updateName(nameInput.trim());
    }
    setEditing(false);
  }

  if (!progress) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const allBadgeIds = Object.keys(BADGE_META);
  const levelLabel =
    progress.totalScore >= 500
      ? "Legend"
      : progress.totalScore >= 200
        ? "Advanced"
        : progress.totalScore >= 50
          ? "Intermediate"
          : "Beginner";

  const nextMilestone =
    progress.totalScore >= 500
      ? 500
      : progress.totalScore >= 200
        ? 500
        : progress.totalScore >= 50
          ? 200
          : 50;

  const milestoneProgress = Math.min(
    (progress.totalScore / nextMilestone) * 100,
    100,
  );

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 mt-12 py-10">
      {/* Profile header */}
      <div className="bg-linear-to-br from-indigo-900 to-indigo-950 border border-indigo-700 rounded-2xl p-8 flex items-center gap-6">
        <div className="bg-indigo-700 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-extrabold text-white shrink-0">
          {progress.userName.charAt(0)}
        </div>
        <div className="flex-1">
          {editing ? (
            <div className="flex items-center gap-2 mb-1">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveName()}
                className="bg-indigo-800 border border-indigo-600 rounded-lg px-3 py-1 text-white text-xl font-bold focus:outline-none"
                autoFocus
              />
              <button
                onClick={saveName}
                className="text-green-400 hover:text-green-300"
              >
                <Check size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-extrabold text-white">
                {progress.userName}
              </h1>
              <button
                onClick={() => setEditing(true)}
                className="text-indigo-400 hover:text-white transition"
              >
                <Edit2 size={16} />
              </button>
            </div>
          )}
          <p className="text-indigo-300 text-sm font-medium">
            <T text={levelLabel} />
          </p>

          {/* XP bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-indigo-400 mb-1">
              <span>{progress.totalScore} pts</span>
              <span>{nextMilestone} pts</span>
            </div>
            <div className="w-full bg-indigo-800 rounded-full h-2">
              <div
                className="bg-indigo-400 h-2 rounded-full transition-all duration-700"
                style={{ width: `${milestoneProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Star size={32} className="text-yellow-400 mx-auto mb-1" />
          <p className="text-yellow-400 font-extrabold text-2xl">
            {progress.totalScore}
          </p>
          <p className="text-gray-400 text-xs">
            <T text="total points" />
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4">
        <ProfileStatsCard
          icon={BookOpen}
          label="Lessons Done"
          value={progress.lessonsCompleted.length}
          color="bg-violet-700"
        />
        <ProfileStatsCard
          icon={Hand}
          label="Signs Learned"
          value={progress.signsLearned}
          color="bg-indigo-700"
        />
        <ProfileStatsCard
          icon={Zap}
          label="Jam Signs Sent"
          value={progress.jamSignsSent}
          color="bg-fuchsia-700"
        />
      </div>

      {/* Lesson progress */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-bold text-lg mb-4">
          <T text={"Lesson Progress"} />
        </h2>
        <div className="flex flex-col gap-3">
          {LESSONS.map((lesson) => {
            const done = progress.lessonsCompleted.includes(lesson.id);
            return (
              <div key={lesson.id} className="flex items-center gap-4">
                <span className="text-2xl">{lesson.emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-white text-sm font-medium">
                      {lesson.title}
                    </span>
                    <span
                      className={`text-xs font-semibold ${done ? "text-green-400" : "text-gray-500"}`}
                    >
                      {done ? "✅ Done" : "Not started"}
                    </span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${done ? "bg-green-500" : "bg-gray-700"}`}
                      style={{ width: done ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4">
          <T
            text={`Badges (${progress.badges.length}/${allBadgeIds.length})`}
          />
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {allBadgeIds.map((id) => (
            <ProfileBage
              key={id}
              id={id}
              earned={progress.badges.includes(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
