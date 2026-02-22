"use client";

import { pusherClient } from "@/lib/pusher";
import { DetectedSign, JamMessage } from "@/types/jamesign";
import { countFingers, generateGuestName } from "@/utils/jameSign";
import axios from "axios";
import { CheckCheck, Copy, Hand, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import JameSignLobby from "./JameSignLobby";
import JamMessageRow from "./JamMessageRow";
import T from "../shared/T";
import useProgress from "@/hooks/useProgress";
import { recordJamSign } from "@/utils/leaderboard";

const JAM_SIGNS: DetectedSign[] = [
  { word: "Hello", emoji: "👋", detect: (lm) => countFingers(lm) >= 4 },
  { word: "Stop", emoji: "✋", detect: (lm) => countFingers(lm) === 5 },
  { word: "One", emoji: "☝️", detect: (lm) => countFingers(lm) === 1 },
  { word: "Peace", emoji: "✌️", detect: (lm) => countFingers(lm) === 2 },
  { word: "Three", emoji: "🤟", detect: (lm) => countFingers(lm) === 3 },
  { word: "Fist", emoji: "✊", detect: (lm) => countFingers(lm) === 0 },
];

const JamSign = () => {
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

  const { syncLeaderboard } = useProgress();

  useEffect(() => {
    if (!roomId) return;
    const channel = pusherClient.subscribe(`jam-${roomId}`);
    channel.bind(
      "sign-event",
      (
        message: Omit<JamMessage, "translatedSign"> & {
          translatedSign: string;
        },
      ) => {
        const bindMessage = async () => {
          const text = message.sign;
          console.log("full mesage ==> ", message);
          try {
            const response = await axios.post("/api/translate", {
              text,
              locale: "es",
            });
            const translatedSign = response.data.translated;
            const newMessage: JamMessage = {
              ...message,
              user: message.user,
              timestamp: new Date(),
              translatedSign,
            };
            console.log("new message ==> ", newMessage);
            setMessages((prev) => [...prev.slice(-49), newMessage]);
          } catch (error) {
            console.log(error);
          }
        };
        bindMessage();
      },
    );
  }, [messages, roomId]);

  const sendSign = useCallback(
    async (sign: DetectedSign) => {
      if (!roomId || cooldown) return;
      setCooldown(true);
      setLastSent(sign.word);
      setTimeout(() => {
        setCooldown(false);
        setLastSent(null);
      }, COOLDOWN_MS);
      try {
        await axios.post("/api/jam/send", {
          roomId,
          user: userName,
          sign: sign.word,
          translatedSign: sign.word,
        });
      } catch (error) {
        console.log(error);
      }

      const updated = recordJamSign();
      syncLeaderboard(updated);
    },
    [cooldown, roomId, syncLeaderboard, userName],
  );

  useEffect(() => {
    if (!roomId) return;
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
                sendSign(matched);
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
  }, [cooldown, roomId, sendSign]);

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

  if (!roomId) return <JameSignLobby onJoin={handleJoinRoom} />;

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-80px)] mt-12 py-10">
      {/* Room header */}
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
            {copied ? <T text="Copied!" /> : <T text="Copy" />}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">
            <T text={`Signing as ${userName}`} />
          </span>
          <button
            onClick={() => {
              setRoomId(null);
              setCameraReady(false);
            }}
            className="text-gray-500 hover:text-red-400 transition text-xs flex items-center gap-1"
          >
            <RefreshCw size={13} />
            <T text="Leave" />
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Left: webcam */}
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

            {/* Status badge */}
            {cameraReady && (
              <div
                className={`absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                ${handDetected ? "bg-green-900 text-green-300 border border-green-700" : "bg-gray-800 text-gray-400 border border-gray-700"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${handDetected ? "bg-green-400 animate-pulse" : "bg-gray-500"}`}
                />
                {handDetected ? (
                  <T text="Hand Detected" />
                ) : (
                  <T text="No Hand" />
                )}
              </div>
            )}

            {/* Current detected sign badge */}
            {currentDetected && !cooldown && (
              <div className="absolute top-3 right-3 bg-indigo-900 border border-indigo-600 px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-200 flex items-center gap-2">
                <span>{currentDetected.emoji}</span>
                <span>{currentDetected.word}</span>
              </div>
            )}

            {/* Hold progress ring */}
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

            {/* Sent confirmation flash */}
            {cooldown && lastSent && (
              <div className="absolute bottom-3 left-3 bg-green-900 border border-green-600 px-4 py-2 rounded-xl text-green-300 text-sm font-semibold flex items-center gap-2">
                <span>✅</span>
                <T text={`Sent: ${lastSent}`} />
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-400 text-center">
            <p>Hold any sign steady for 1.5 seconds to send it to the room.</p>
          </div>
        </div>

        {/* Right: chat feed */}
        <div className="flex flex-col bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <Hand size={16} className="text-indigo-400" />
            <span className="text-white font-semibold text-sm">Sign Feed</span>
            <span className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full ml-auto">
              {messages.length} <T text="signs" />
            </span>
          </div>

          {/* Messages */}
          <div
            ref={feedRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 min-h-0"
          >
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 text-gray-600">
                <span className="text-4xl">🤟</span>
                <p className="text-sm">No signs yet. Be the first to sign!</p>
                <p className="text-xs">
                  Share the room code with a friend to practice together.
                </p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <JamMessageRow
                  key={i}
                  msg={msg}
                  isOwn={msg.user === userName}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JamSign;
