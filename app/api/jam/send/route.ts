import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { roomId, user, sign, emoji, translatedSign } = await request.json()
        if (!roomId || !user || !sign) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        await pusherServer.trigger(`jam-${roomId}`, "sign-event", {
            user,
            sign,
            emoji,
            translatedSign
        })
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.log(error)
    }
}