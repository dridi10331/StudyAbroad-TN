import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthToken } from "@/lib/auth.config";

export async function POST(req: Request) {
  try {
    const decoded = await getAuthToken();

    if (!decoded) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { language } = await req.json();

    // Create a new chat session
    const session = await prisma.chatSession.create({
      data: {
        userId: decoded.id,
        language: language || "french",
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
