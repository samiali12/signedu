import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

const leaderboard: Map<string, { score: number; signsLearned: number; jamSignsSent: number; lastActive: number }> = new Map();

export async function POST(req: NextRequest) {
  const { userName, totalScore, signsLearned, jamSignsSent } = await req.json();

  if (!userName) return NextResponse.json({ error: "Missing userName" }, { status: 400 });

  leaderboard.set(userName, {
    score: totalScore,
    signsLearned,
    jamSignsSent,
    lastActive: Date.now(),
  });

  const board = getBoard();

  // Broadcast updated leaderboard to all clients
  await pusherServer.trigger("leaderboard", "update", { board });

  return NextResponse.json({ ok: true, board });
}

export async function GET() {
  return NextResponse.json({ board: getBoard() });
}

function getBoard() {
  return Array.from(leaderboard.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}