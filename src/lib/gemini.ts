import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export default genAI;
