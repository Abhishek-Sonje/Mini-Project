import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateTestCases = async (apiKey, code, framework) => {
  if (!apiKey) throw new Error("API Key is required");
  if (!code) throw new Error("Code is required");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert software tester.
      Generate high-quality test cases for the following code using ${framework}.
      Include unit tests, edge cases, and potential failure scenarios.
      
      Code:
      \`\`\`
      ${code}
      \`\`\`
      
      Output the response in Markdown format.
      Provide ONLY the code for the test file, with a brief comment explaining each test case if necessary.
      Do not include conversational filler.
      If the code is invalid or empty, return a polite error message.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate test cases");
  }
};
