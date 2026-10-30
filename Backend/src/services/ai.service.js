import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate profile is for dedicated job",
    ),
  technicalQuestion: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "A sample answer to the question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical question that can be asked in the interview along with their intention and answer",
    ),
  behavioralQuestion: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "A sample answer to the question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral question that can be asked in the interview along with their intention and answer",
    ),
  skillGap: z.array(
    z.object({
      skill: z.string().describe("The skill which the candidate is lacking"),
      severity: z
        .enum(["low", "medium", "high"])
        .describe("The severity of the skill"),
    }),
  ),
  preprationPlan: z.array(
    z.object({
      day: z
        .number()
        .describe("The day number in the preperation plan, strating from 1"),
      focus: z
        .string()
        .describe(
          "The main focus of this day in the preperation plan, eg. data structure",
        ),
      tasks: z
        .array(z.string().describe("List of tasks to be done on this day"))
        .describe(
          "A day-wise preperation plan for the candidate to follow in ",
        ),
    }),
  ),
  title: z.string().describe("Job title is required")
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  try {
    const prompt = `You are an experienced technical interviewer and career coach.

    Analyze the candidate's suitability for the job and generate an
    interview preparation report.

    RESUME:
    ${resume}

    SELF DESCRIPTION:
    ${selfDescription}

    JOB DESCRIPTION:
    ${jobDescription}
    `;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: z.toJSONSchema(interviewReportSchema),
      },
    });
    const result = JSON.parse(response.text);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export default generateInterviewReport;
