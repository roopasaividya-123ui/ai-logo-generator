import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY environment variable is missing.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const aiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  },
});

/**
 * Clean raw text response from Gemini to extract valid JSON string.
 */
function cleanJsonResponse(text) {
  if (!text) return "";
  let cleaned = text.trim();
  // Remove markdown code fence blocks if present
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
}

/**
 * Server-side helper to generate design ideas using Gemini AI.
 * @param {string} prompt 
 * @returns {Promise<{ generated_prompt?: string, ideas: string[] }>}
 */
export async function generateDesignIdeas(prompt) {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  const result = await aiModel.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const responseText = result.response.text();
  const cleanedText = cleanJsonResponse(responseText);

  try {
    const parsed = JSON.parse(cleanedText);
    
    // Ensure ideas array is present and formatted
    let ideas = [];
    if (Array.isArray(parsed?.ideas)) {
      ideas = parsed.ideas;
    } else if (Array.isArray(parsed?.suggestions)) {
      ideas = parsed.suggestions;
    } else if (typeof parsed === "object" && parsed !== null) {
      ideas = Object.values(parsed).filter((v) => typeof v === "string");
    }

    if (!ideas.length) {
      ideas = ["Modern & Minimalist", "Vibrant & Dynamic", "Classic & Elegant", "Bold Geometric Mark"];
    }

    return {
      generated_prompt: parsed?.generated_prompt || prompt,
      ideas,
    };
  } catch (parseError) {
    console.error("Failed to parse Gemini JSON response:", responseText, parseError);
    return {
      generated_prompt: prompt,
      ideas: ["Modern & Minimalist", "Vibrant & Dynamic", "Classic & Elegant", "Bold Geometric Mark"],
    };
  }
}