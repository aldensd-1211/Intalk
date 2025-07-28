import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();
  const FINAL_PROMPT = QUESTION_PROMPT.replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);

  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_URL =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    const payload = {
      contents: [
        {
          parts: [
            {
              text: FINAL_PROMPT,
            },
          ],
        },
      ],
    };

    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const generated = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ content: generated });
  } catch (error) {
    console.error("Error from Gemini:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Gemini API" },
      { status: 500 }
    );
  }
}
