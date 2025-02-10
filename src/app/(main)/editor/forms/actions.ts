"use server";

import genAI from "@/lib/gemini";

import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryInput) {
  // TODO: Block for non-premium users

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
    Only return the summary and do not include any other information in the response. Keep it concise and professional.
  `;

  const userMessage = `
    Please generate a professional resume summary from this data:

    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (exp) => `Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}\nDescription:\n${exp.description || "N/A"}`
      )
      .join("\n\n")}

    Education:
    ${educations
      ?.map(
        (edu) => `Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}`
      )
      .join("\n\n")}

    Skills:
    ${skills}
  `;

  console.log("systemMessage", systemMessage);
  console.log("userMessage", userMessage);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([systemMessage, userMessage]);

    const aiResponse = await result.response.text();

    if (!aiResponse) {
      throw new Error("Failed to generate AI response");
    }

    return aiResponse;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("AI service error");
  }
}

export async function generateWorkExperience(input: GenerateWorkExperienceInput) {
  // TODO: Block for non-premium users

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
  You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
  Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

  Job title: <job title>
  Company: <company name>
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, might be inferred from the job title>
  `;

  const userMessage = `Please provide a work experience entry from this description:\n${description}`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([systemMessage, userMessage]);

    const aiResponse = await result.response.text();

    if (!aiResponse) {
      throw new Error("Failed to generate AI response");
    }

    console.log("aiResponse", aiResponse);

    return {
      position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
      company: aiResponse.match(/Company: (.*)/)?.[1] || "",
      description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
      startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
      endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
    } satisfies WorkExperience;
  } catch (error) {
    console.error("Error generating work experience:", error);
    throw new Error("AI service error");
  }
}
