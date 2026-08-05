import { generateDesignIdeas } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !body.prompt || typeof body.prompt !== "string" || !body.prompt.trim()) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing 'prompt' parameter in request body." },
        { status: 400 }
      );
    }

    const data = await generateDesignIdeas(body.prompt);

    return NextResponse.json({
      success: true,
      ideas: data.ideas,
      generated_prompt: data.generated_prompt,
    }, { status: 200 });

  } catch (error) {
    console.error("Error in /api/ai-design-ideas API route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate design ideas.",
      },
      { status: 500 }
    );
  }
}