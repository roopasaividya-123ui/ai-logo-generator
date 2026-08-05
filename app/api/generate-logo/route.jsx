import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

/**
 * Generate a visual SVG vector logo markup directly using Gemini AI or structured canvas generator.
 */
async function generateVectorSvgLogo({ title, desc, palette, colors, designStyle, idea }) {
  const colorList = Array.isArray(colors) && colors.length > 0 ? colors.join(", ") : "Modern colors";

  const prompt = `Create a clean, scalable, modern SVG vector logo code for brand named "${title}".
Style: ${designStyle || 'Minimalist'}
Concept: ${idea || 'Clean geometric emblem'}
Brand description: ${desc || ''}
Color palette: ${colorList}

CRITICAL RULES FOR OUTPUT:
1. Return ONLY pure raw valid SVG code starting with <svg> and ending with </svg>.
2. Do NOT enclose in markdown code fences or backticks.
3. SVG dimensions MUST be viewBox="0 0 500 500" width="500" height="500".
4. Include a stylish background rectangle, clear icon/symbol path, and legible brand title text element.`;

  try {
    if (apiKey) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();
      
      // Clean markdown code blocks if returned
      if (text.startsWith("```xml") || text.startsWith("```svg") || text.startsWith("```html")) {
        text = text.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "");
      } else if (text.startsWith("```")) {
        text = text.replace(/^```\n?/, "").replace(/\n?```$/, "");
      }
      
      if (text.includes("<svg") && text.includes("</svg>")) {
        return text.substring(text.indexOf("<svg"), text.indexOf("</svg>") + 6);
      }
    }
  } catch (err) {
    console.warn("Gemini SVG generation fallback:", err.message);
  }

  // Pure procedural SVG fallback generator if AI rate limited
  const primaryColor = colors?.[0] || "#3b82f6";
  const secondaryColor = colors?.[1] || "#8b5cf6";
  const accentColor = colors?.[2] || "#f43f5e";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="50%" stop-color="${secondaryColor}"/>
      <stop offset="100%" stop-color="${accentColor}"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  
  <rect width="500" height="500" rx="32" fill="url(#bgGrad)"/>
  
  <!-- Central Emblem Symbol -->
  <g transform="translate(250, 200)" filter="url(#glow)">
    <circle r="85" fill="none" stroke="url(#logoGrad)" stroke-width="12" opacity="0.4"/>
    <path d="M -45 -45 L 45 -45 L 0 45 Z" fill="url(#logoGrad)"/>
    <circle r="25" fill="${accentColor}"/>
  </g>
  
  <!-- Brand Title -->
  <text x="250" y="360" text-anchor="middle" font-family="'Host Grotesk', system-ui, sans-serif" font-weight="800" font-size="34" fill="#ffffff" letter-spacing="2">
    ${title.toUpperCase()}
  </text>

  <!-- Subtitle Idea / Concept -->
  <text x="250" y="400" text-anchor="middle" font-family="'Host Grotesk', system-ui, sans-serif" font-weight="500" font-size="14" fill="#94a3b8" letter-spacing="1">
    ${designStyle || "CREATIVE LOGO STUDIO"}
  </text>
</svg>`;
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid 'title' parameter." },
        { status: 400 }
      );
    }

    const { title, desc, palette, colors, designStyle, idea } = body;

    // Generate high quality SVG code
    const svgMarkup = await generateVectorSvgLogo({
      title,
      desc,
      palette,
      colors,
      designStyle,
      idea,
    });

    // Generate complementary image URL via Pollinations AI high resolution engine
    const promptSeed = encodeURIComponent(
      `vector logo mark for "${title}", ${idea || 'minimalist symbol'}, ${designStyle || 'modern'}, color palette ${palette || 'vibrant'}, 8k, graphic design, black background`
    );
    const generatedImageUrl = `https://image.pollinations.ai/prompt/${promptSeed}?width=600&height=600&nologo=true&seed=${Math.floor(Math.random() * 10000)}`;

    const logoPayload = {
      title,
      desc: desc || "",
      palette: palette || "Default",
      colors: colors || ["#3b82f6", "#8b5cf6"],
      designStyle: designStyle || "Modern",
      idea: idea || "Custom AI Emblem",
      imageUrl: generatedImageUrl,
      svgContent: svgMarkup,
    };

    return NextResponse.json(
      {
        success: true,
        logo: logoPayload,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating logo in /api/generate-logo:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate logo." },
      { status: 500 }
    );
  }
}
