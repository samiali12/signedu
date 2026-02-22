"use client";

import { LeaderboardEntry } from "@/types/leaderboard";
import { Medal, Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
import useProgress from "@/hooks/useProgress";
import { timeAgo } from "@/utils/leaderboard";
import { pusherClient } from "@/lib/pusher";

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy size={20} className="text-yellow-400" />;
  if (rank === 2) return <Medal size={20} className="text-gray-300" />;
  if (rank === 3) return <Medal size={20} className="text-amber-600" />;
  return (
    <span className="text-gray-500 font-bold text-sm w-5 text-center">
      {" "}
      {rank}{" "}
    </span>
  );
};

const Leaderboard = () => {
  const [board, setBoard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { progress, syncLeaderboard } = useProgress();

  // Initial fetch
  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((d) => {
        setBoard(d.board);
        setLoading(false);
      });
  }, []);

  // Sync own progress to leaderboard on mount
  useEffect(() => {
    if (progress && progress.totalScore > 0) {
      syncLeaderboard(progress);
    }
  }, [progress, syncLeaderboard]);

  // Live updates via Pusher
  useEffect(() => {
    const channel = pusherClient.subscribe("leaderboard");
    channel.bind("update", (data: { board: LeaderboardEntry[] }) => {
      setBoard(data.board);
    });
    return () => pusherClient.unsubscribe("leaderboard");
  }, []);

  const myRank = progress
    ? board.findIndex((e) => e.name === progress.userName) + 1
    : 0;

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 mt-12 py-10">
      <div className="text-center">
        <div className="inline-flex bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-2xl mb-4">
          <Trophy size={40} className="text-yellow-400" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Global Leaderboard
        </h1>
        <p className="text-gray-400">
          Top signers from around the world. Updated in real-time.
        </p>
      </div>

      {progress && myRank > 0 && (
        <div className="bg-indigo-950 border border-indigo-700 rounded-2xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-800 rounded-full w-10 h-10 flex items-center justify-center font-bold text-indigo-200">
              {myRank}
            </div>
            <div>
              <p className="text-white font-bold">{progress.userName}</p>
              <p className="text-indigo-300 text-sm">Your current rank</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-yellow-400 font-bold text-xl">
              {progress.totalScore} pts
            </p>
            <p className="text-gray-400 text-xs">
              {progress.signsLearned} signs
            </p>
          </div>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 text-gray-500 text-xs uppercase tracking-wider px-5 py-3 border-b border-gray-800">
          <span className="col-span-1">#</span>
          <span className="col-span-5">Signer</span>
          <span className="col-span-2 text-center">Signs</span>
          <span className="col-span-2 text-center">Jams</span>
          <span className="col-span-2 text-right">Score</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : board.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <p className="text-4xl mb-3">🏆</p>
            <p>No entries yet. Complete a lesson to appear here!</p>
          </div>
        ) : (
          board.map((entry, i) => {
            const isMe = entry.name === progress?.userName;
            return (
              <div
                key={entry.name}
                className={`grid grid-cols-12 items-center px-5 py-4 border-b border-gray-800 last:border-0 transition
                  ${isMe ? "bg-indigo-950/50" : "hover:bg-gray-800/50"}`}
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center">
                  <RankIcon rank={i + 1} />
                </div>

                {/* Name */}
                <div className="col-span-5 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0
                    ${isMe ? "bg-indigo-700 text-indigo-200" : "bg-gray-800 text-gray-400"}`}
                  >
                    {entry.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className={`font-semibold text-sm ${isMe ? "text-indigo-300" : "text-white"}`}
                    >
                      {entry.name}{" "}
                      {isMe && (
                        <span className="text-xs text-indigo-500">(you)</span>
                      )}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {timeAgo(entry.lastActive)}
                    </p>
                  </div>
                </div>

                {/* Signs */}
                <div className="col-span-2 text-center text-gray-300 text-sm">
                  {entry.signsLearned}
                </div>

                {/* Jams */}
                <div className="col-span-2 text-center text-gray-300 text-sm">
                  {entry.jamSignsSent}
                </div>

                {/* Score */}
                <div className="col-span-2 text-right font-bold text-yellow-400">
                  {entry.score}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <p>Leaderboard updates in real-time</p>
      </div>
    </div>
  );
};

export default Leaderboard;
