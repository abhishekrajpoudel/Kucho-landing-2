import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Google GenAI client with standard key and user-agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are the expert AI Pest Advisor for Bugfree Pest Control. 
You provide friendly, informative, safe, and professional advice regarding pest identification, pest control, safety, and prevention.
Keep your answers highly helpful, concise, and structured. Use bullet points and bold text where appropriate to make it easily readable on a screen.
If the pest problem described seems dangerous (e.g. wasps, venomous spiders, large rodent infestations, or severe termites), kindly but firmly recommend booking a professional inspection immediately through the scheduling tool on our website.
Never recommend highly toxic chemicals without strong safety warnings. Always emphasize child, pet, and environmental safety.`
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate content" }, { status: 500 });
  }
}
