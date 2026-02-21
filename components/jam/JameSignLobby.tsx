"use client";

import useTranslate from "@/hooks/useTranslate";
import { generateGuestName, generateRoomId } from "@/utils/jameSign";
import { Hand, Send, Users } from "lucide-react";
import { useState } from "react";
import T from "../shared/T";

const JamSignLobby = ({
  onJoin,
}: {
  onJoin: (roomId: string, userName: string) => void;
}) => {
  const [inputRoom, setInputRoom] = useState("");
  const [userName, setUserName] = useState(generateGuestName());
  const heading = useTranslate("Sign Jam");
  const subheading = useTranslate(
    "Practice signing with people around the world in real-time.",
  );

  return (
    <div className="flex flex-col items-center gap-10 py-16 mt-12 max-w-md mx-auto text-center">
      <div>
        <div className="bg-indigo-600 p-4 rounded-2xl inline-flex mb-4">
          <Users size={40} className="text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2">{heading}</h1>
        <p className="text-gray-400">{subheading}</p>
      </div>

      <div className="w-full flex flex-col gap-4">
        {/* Username */}
        <div className="text-left">
          <label className="text-gray-400 text-sm mb-1 block">
            <T text="Your name" />
          </label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
            placeholder="Guest name"
          />
        </div>

        {/* Create room */}
        <button
          onClick={() => onJoin(generateRoomId(), userName)}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
        >
          <Hand size={18} />
          <T text="Create New Room" />
        </button>

        <div className="flex items-center gap-3 text-gray-600">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-sm">
            <T text="or join existing" />
          </span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        {/* Join room */}
        <div className="flex gap-2">
          <input
            value={inputRoom}
            onChange={(e) => setInputRoom(e.target.value.toUpperCase())}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition uppercase tracking-widest font-mono"
            placeholder="ROOM CODE"
            maxLength={6}
          />
          <button
            onClick={() => inputRoom.length >= 4 && onJoin(inputRoom, userName)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl font-semibold transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JamSignLobby;
