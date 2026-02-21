"use client";

import useTranslate from "@/hooks/useTranslate";
import { CheckCheck, Copy, Hand, RefreshCw, Send, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type JamMessage = {
  user: string;
  sign: string;
  emoji: string;
  translatedSign: string;
  timestamp: number;
};

type DetectedSign = {
  word: string;
  emoji: string;
  detect: (lm: number[][]) => boolean;
};

const JAM_SIGNS: DetectedSign[] = [
  { word: "Hello", emoji: "👋", detect: (lm) => countFingers(lm) >= 4 },
  { word: "Stop", emoji: "✋", detect: (lm) => countFingers(lm) === 5 },
  { word: "One", emoji: "☝️", detect: (lm) => countFingers(lm) === 1 },
  { word: "Peace", emoji: "✌️", detect: (lm) => countFingers(lm) === 2 },
  { word: "Three", emoji: "🤟", detect: (lm) => countFingers(lm) === 3 },
  { word: "Fist", emoji: "✊", detect: (lm) => countFingers(lm) === 0 },
];

const countFingers = (lm: number[][]): number => {
  if (!lm || lm.length < 21) return -1;
  const tips = [8, 12, 16, 20];
  const mids = [6, 10, 14, 18];
  let count = 0;
  for (let i = 0; i < 4; i++) {
    if (lm[tips[i]][1] < lm[mids[i]][1]) count++;
  }
  if (Math.abs(lm[4][0] - lm[2][0]) > 0.05) count++;
  return count;
};

const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const generateGuestName = () => {
  const adjectives = ["Swift", "Brave", "Calm", "Bright", "Kind"];
  const nouns = ["Signer", "Learner", "Wizard", "Coder", "Hand"];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}`;
};

const Lobby = ({
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
    <div className="flex flex-col items-center gap-10 py-16 max-w-md mx-auto text-center">
      <div>
        <div className="bg-indigo-600 p-4 rounded-2xl inline-flex mb-4">
          <Users size={40} className="text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2">{heading}</h1>
        <p className="text-gray-400">{subheading}</p>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="text-left">
          <label className="text-gray-400 text-sm mb-1 block">Your Name</label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
            placeholder="Guest name"
          />
          <button
            onClick={() => onJoin(generateRoomId(), userName)}
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
          >
            <Hand size={18} />
            Create New Room
          </button>

          <div className="mt-2 flex items-center gap-3 text-gray-600">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-sm">or join existing</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          <div className="flex gap-2 mt-2">
            <input
              value={inputRoom}
              onChange={(e) => setInputRoom(e.target.value.toUpperCase())}
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition uppercase tracking-widest font-mono"
              placeholder="ROOM CODE"
              maxLength={6}
            />
            <button
              onClick={() =>
                inputRoom.length >= 4 && onJoin(inputRoom, userName)
              }
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl font-semibold transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Jam = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState<JamMessage[]>([]);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [handDetected, setHandDetected] = useState(false);
  const [currentDetected, setCurrentDetected] = useState<DetectedSign | null>(
    null,
  );
  const [holdProgress, setHoldProgress] = useState(0);
  const [lastSent, setLastSent] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(false);

  const holdStart = useRef<number | null>(null);
  const HOLD_MS = 1500;
  const COOLDOWN_MS = 2000;
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (!roomId) return;
    let camera: { start: () => void; stop: () => void } | null = null;

    const initMediaPipe = async () => {
      try {
        const { Hands, HAND_CONNECTIONS } = await import("@mediapipe/hands");
        const { Camera } = await import("@mediapipe/camera_utils");
        const { drawConnectors, drawLandmarks } = await import(
          "@mediapipe/drawing_utils"
        );

        if (!videoRef.current || !canvasRef.current) return;

        const hands = new Hands({
          locateFile: (file: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.7,
        });
        hands.onResults((results) => {
          const canvas = canvasRef.current;
          const video = videoRef.current;

          if (!video || !canvas) return;

          const ctx = canvas?.getContext("2d");
          if (!ctx) return;

          canvas.width = video?.videoWidth;
          canvas.height = video?.videoHeight;

          ctx.save();

          ctx.clearRect(0, 0, canvas?.width, canvas?.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          ctx.restore();

          if (
            results.multiHandLandmarks &&
            results.multiHandLandmarks?.length > 0
          ) {
            const landmarks = results.multiHandLandmarks[0];
            setHandDetected(true);

            drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
              color: "#6366F1",
              lineWidth: 2,
            });

            drawLandmarks(ctx, landmarks, {
              color: "#a5b4fc",
              lineWidth: 2,
              radius: 3,
            });

            const lmArray = landmarks.map((lm) => [lm.x, lm.y, lm.z]);

            const matched = JAM_SIGNS.find((s) => s.detect(lmArray)) ?? null;
            setCurrentDetected(matched);

            if (matched && !cooldown) {
              if (!holdStart.current) holdStart.current = Date.now();
              const elapsed = Date.now() - holdStart.current;
              const progress = Math.min((elapsed / HOLD_MS) * 100, 100);
              setHoldProgress(progress);

              if (elapsed >= HOLD_MS) {
                holdStart.current = null;
                setHoldProgress(0);
                //sendSign(matched);
              }
            } else if (!matched) {
              holdStart.current = null;
              setHoldProgress(0);
            } else {
              setHandDetected(false);
              holdStart.current = null;
              setHoldProgress(0);
            }
          }
        });

        camera = new Camera(videoRef.current!, {
          onFrame: async () => {
            if (videoRef.current) {
              await hands.send({
                image: videoRef.current,
              });
            }
          },
          width: 640,
          height: 480,
        });

        camera.start();

        videoRef.current.onloadeddata = () => {
          setCameraReady(true);
        };
      } catch (err) {
        console.error("MediaPipe init failed:", err);
        setCameraError(true);
      }
    };

    initMediaPipe();
  }, [cooldown, roomId]);

  const copyRoomCode = () => {
    if (!roomId) return;
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinRoom = (id: string, name: string) => {
    setRoomId(id);
    setUserName(name || generateGuestName());
    setMessages([]);
  };

  if (!roomId) return <Lobby onJoin={handleJoinRoom} />;

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-80px)] mt-16 pt-10">
      <div className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-2xl px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white font-semibold">Room</span>
          <code className="bg-indigo-950 border border-indigo-800 text-indigo-300 px-3 py-1 rounded-lg font-mono font-bold tracking-widest text-sm">
            {roomId}
          </code>
          <button
            onClick={copyRoomCode}
            className="text-gray-500 hover:text-white transition flex items-center gap-1 text-xs"
          >
            {copied ? (
              <CheckCheck size={14} className="text-green-400" />
            ) : (
              <Copy size={14} />
            )}
            {copied ? <span>Copied!</span> : <span>Copy</span>}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">Signing as {userName}</span>
          <button
            onClick={() => {
              setRoomId(null);
              setCameraReady(false);
            }}
            className="text-gray-500 hover:text-red-400 transition text-xs flex items-center gap-1"
          >
            <RefreshCw size={13} />
            <span>Leave</span>
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        <div className="flex flex-col gap-3">
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              className="hidden"
              autoPlay
              playsInline
              muted
            />
            {!cameraReady && !cameraError && (
              <div className="flex flex-col items-center gap-3 absolute inset-0 justify-center">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">Starting camera...</p>
              </div>
            )}

            {cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
                <p className="text-red-400 font-semibold">
                  Camera access denied
                </p>
                <p className="text-gray-500 text-sm">
                  Enable camera to sign in the jam.
                </p>
              </div>
            )}

            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="w-full h-full object-cover"
            />

            {cameraReady && (
              <div
                className={`absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                ${handDetected ? "bg-green-900 text-green-300 border border-green-700" : "bg-gray-800 text-gray-400 border border-gray-700"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${handDetected ? "bg-green-400 animate-pulse" : "bg-gray-500"}`}
                />
                {handDetected ? (
                  <span>Hand Detected</span>
                ) : (
                  <span>No Hand</span>
                )}
              </div>
            )}

            {currentDetected && !cooldown && (
              <div className="absolute top-3 right-3 bg-indigo-900 border border-indigo-600 px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-200 flex items-center gap-2">
                <span>{currentDetected.emoji}</span>
                <span>{currentDetected.word}</span>
              </div>
            )}

            {holdProgress > 0 && (
              <div className="absolute bottom-3 right-3 w-14 h-14">
                <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#1e1b4b"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeDasharray={`${holdProgress} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-indigo-400 text-xs font-bold">
                  {Math.round(holdProgress)}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jam;
