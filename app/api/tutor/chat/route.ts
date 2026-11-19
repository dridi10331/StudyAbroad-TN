import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthToken } from "@/lib/auth.config";
import OpenAI from "openai";

const LANGUAGE_PROMPTS = {
  french: `Tu es un tuteur expert en français langue étrangère. Aide l'étudiant à améliorer son français jusqu'au niveau C1. 
- Corrige ses erreurs avec bienveillance
- Explique les règles de grammaire quand nécessaire
- Propose des exercices pratiques
- Adapte-toi à son niveau actuel
- Encourage et motive l'étudiant`,

  english: `You are an expert English language tutor. Help the student improve their English to C1 level.
- Correct their mistakes kindly
- Explain grammar rules when necessary
- Provide practical exercises
- Adapt to their current level
- Encourage and motivate the student`,

  arabic: `أنت معلم خبير في اللغة العربية كلغة أجنبية. ساعد الطالب على تحسين لغته العربية إلى مستوى C1.
- صحح أخطاءه برفق
- اشرح قواعد النحو عند الضرورة
- قدم تمارين عملية
- تكيف مع المستوى الحالي للطالب
- شجع وحفز الطالب`,
};

export async function POST(req: Request) {
  try {
    const decoded = await getAuthToken();

    if (!decoded) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { sessionId, message, language } = await req.json();

    // Check if user has access (subscription)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // For MVP, allow limited access without subscription
    // TODO: Implement proper subscription checks

    // Verify session belongs to user
    const session = await prisma.chatSession.findFirst({
      where: {
        id: sessionId,
        userId: decoded.id,
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 20, // Last 20 messages for context
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: "user",
        content: message,
      },
    });

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Return a mock response if no API key
      const mockResponses: Record<string, string> = {
        french: "Bonjour! Je suis votre tuteur IA. Configurez votre clé OpenAI API pour commencer.",
        english: "Hello! I'm your AI tutor. Configure your OpenAI API key to get started.",
        arabic: "مرحبا! أنا مدرسك الذكي. يرجى تكوين مفتاح OpenAI API للبدء.",
      };
      const mockResponse = mockResponses[language] ?? "Configuration required.";

      await prisma.chatMessage.create({
        data: {
          sessionId,
          role: "assistant",
          content: mockResponse,
        },
      });

      return NextResponse.json({ message: mockResponse });
    }

    // Build conversation history
    const conversationHistory = session.messages.map((msg) => ({
      role: msg.role as "user" | "assistant" | "system",
      content: msg.content,
    }));

    // Get AI response
    const systemPrompt =
      LANGUAGE_PROMPTS[language as keyof typeof LANGUAGE_PROMPTS] ??
      LANGUAGE_PROMPTS.french;
    
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...conversationHistory,
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage =
      completion.choices[0]?.message?.content ||
      "Désolé, je n'ai pas pu générer de réponse.";

    // Save assistant message
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: "assistant",
        content: assistantMessage,
        tokenCount: completion.usage?.total_tokens,
      },
    });

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat" },
      { status: 500 }
    );
  }
}
