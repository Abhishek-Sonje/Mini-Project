import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { code, framework } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "Code is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server configuration error: API Key missing" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert software tester.
      Generate comprehensive unit test cases for the following code using ${framework}.
      
      Requirements:
      1. Cover happy paths, edge cases, and error conditions.
      2. Use modern best practices for ${framework}.
      3. Provide ONLY the code, no markdown formatting or explanations outside comments.
      4. If the code is invalid or empty, return a comment explaining why.

      Code to test:
      ${code}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up markdown code blocks if present
    const cleanText = text.replace(/```\w*\n/g, '').replace(/```/g, '');

    return NextResponse.json({ result: cleanText });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate test cases" },
      { status: 500 }
    );
  }
}
