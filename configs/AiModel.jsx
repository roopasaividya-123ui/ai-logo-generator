import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIDesignIdea = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "DESIGN_IDEA_PROMPT:'Based on Logo of type ModernMascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian spice with description: Indian Restaurant... Result in JSON format'" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "{\"generated_prompt\": \"...\", \"ideas\": [...]}" }, // Removed the markdown backticks here to keep JSON pure
      ],
    },
  ],
});