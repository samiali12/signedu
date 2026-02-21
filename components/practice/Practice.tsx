"use client";

import { countFingersUp } from "@/data/practice";
import { Camera, CheckCircle, Hand, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import T from "../shared/T";

export interface PracticeSign {
  id: string;
  word: string;
  instruction: string;
  emoji: string;
  detect: (landmarks: number[][]) => boolean;
}

export interface PracticeProps {
  practice_sign: Omit<PracticeSign, "detect">[]; // functions removed for server
}

const Practice = ({ practice_sign }: PracticeProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [handDetected, setHandDetected] = useState(false);
  const [signDetected, setSignDetected] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0); // 0-100 hold to confirm
  const holdStart = useRef<number | null>(null);
  const HOLD_DURATION = 1500;

  const signsWithDetect: PracticeSign[] = practice_sign.map((sign) => ({
    ...sign,
    detect: (landmarks: number[][]) => {
      switch (sign.id) {
        case "hello":
          return countFingersUp(landmarks) >= 4;
        case "one":
          return countFingersUp(landmarks) === 1;
        case "peace":
          return countFingersUp(landmarks) === 2;
        case "three":
          return countFingersUp(landmarks) === 3;
        case "five":
          return countFingersUp(landmarks) === 5;
        case "fist":
          return countFingersUp(landmarks) === 0;
        default:
          return false;
      }
    },
  }));

  const currentSign = signsWithDetect[currentSignIndex];

  useEffect(() => {
    let camera: { start: () => void; stop: () => void } | null = null;

    const initMediaPipe = async () => {
      try {
        const { Camera } = await import("@mediapipe/camera_utils");
        const { Hands } = await import("@mediapipe/hands");
        const { drawConnectors, drawLandmarks } = await import(
          "@mediapipe/drawing_utils"
        );
        const { HAND_CONNECTIONS } = await import("@mediapipe/hands");

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

          if (!canvas || !video) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          canvas.width = video?.videoWidth;
          canvas.height = video?.videoHeight;

          ctx.save();

          ctx.clearRect(0, 0, canvas.width, canvas.height);

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

            const matched = signsWithDetect[currentSignIndex].detect(lmArray);

            if (matched && !signDetected) {
              if (!holdStart.current) holdStart.current = Date.now();
              const elapsed = Date.now() - holdStart.current;
              const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
              setHoldProgress(progress);

              if (elapsed >= HOLD_DURATION) {
                setSignDetected(true);
                setScore((s) => s + 1);
                setHoldProgress(100);
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

        // start camera FIRST
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
    return () => {
      camera?.stop();
    };
  }, [currentSignIndex, signsWithDetect, signDetected]);

  const handleNext = useCallback(() => {
    setSignDetected(false);
    setHoldProgress(0);
    holdStart.current = null;
    if (currentSignIndex + 1 < signsWithDetect.length) {
      setCurrentSignIndex((i) => i + 1);
    } else {
      setCurrentSignIndex(0);
      setScore(0);
    }
  }, [currentSignIndex, signsWithDetect.length]);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 mt-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Hand size={32} className="text-indigo-400" />
            <p>Sign Practice</p>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            <T text="Show the sign with your hand in front of the camera." />
          </p>
        </div>
        <div className="bg-indigo-950 border border-indigo-800 px-5 py-3 rounded-xl text-center">
          <div className="text-indigo-400 font-bold text-2xl">{score}</div>
          <div className="text-gray-500 text-xs">
            <p>signs done</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
          <video ref={videoRef} className="hidden" autoPlay playsInline muted />
          {cameraError ? (
            <div className="flex flex-col items-center gap-3 text-center p-6">
              <Camera size={40} className="text-red-400" />
              <p className="text-red-400 font-semibold">Camera access denied</p>
              <p className="text-gray-500 text-sm">
                Please allow camera access to use this feature.
              </p>
            </div>
          ) : !cameraReady ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Starting camera...</p>
            </div>
          ) : null}

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
              {handDetected ? <span>Hand Detected</span> : <span>No Hand</span>}
            </div>
          )}

          {holdProgress > 0 && !signDetected && (
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
        <div className="flex flex-col gap-4">
          <div
            className={`bg-gray-900 border rounded-2xl p-6 flex flex-col items-center gap-4 text-center transition-all duration-300
            ${signDetected ? "border-green-600 bg-green-950" : "border-gray-800"}`}
          >
            <div className="text-7xl">{currentSign.emoji}</div>
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-1">
                {currentSign.word}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {currentSign.instruction}
              </p>
            </div>
            {!signDetected && holdProgress > 0 && (
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${holdProgress}%` }}
                />
              </div>
            )}

            {signDetected && (
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="flex items-center gap-2 text-green-400 font-bold">
                  <CheckCircle size={22} />
                  <p>Sign Recognized! 🎉</p>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  <p>
                    text=
                    {currentSignIndex + 1 < signsWithDetect.length
                      ? "Next Sign"
                      : "Restart"}
                  </p>
                  <RefreshCw size={16} />
                </button>
              </div>
            )}
          </div>
          {!signDetected && handDetected && (
            <p className="text-gray-500 text-xs">
              Hold the sign steady to confirm...
            </p>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <p className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">
            Practice Queue
          </p>
          <div className="flex flex-col gap-2">
            {signsWithDetect.map(async (sign, i) => (
              <div
                key={sign.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition
                    ${i === currentSignIndex ? "bg-indigo-950 border border-indigo-800 text-white" : "text-gray-600"}`}
              >
                <span className="text-xl">{sign.emoji}</span>
                <span className={i < currentSignIndex ? "line-through" : ""}>
                  {sign.word}
                </span>
                {i < currentSignIndex && (
                  <CheckCircle size={14} className="text-green-500 ml-auto" />
                )}
                {i === currentSignIndex && (
                  <div className="w-2 h-2 bg-indigo-400 rounded-full ml-auto animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
