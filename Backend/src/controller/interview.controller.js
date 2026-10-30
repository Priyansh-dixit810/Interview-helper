import { PDFParse } from "pdf-parse";
import interviewReportModel from "../models/interviewReport.model.js";
import generateInterviewReport from "../services/ai.service.js";

export const generateInterviewReportController = async (req, res) => {
  const resumeFile = req.file;
  const resumeContent = await new PDFParse(
    Uint8Array.from(resumeFile.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;
  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });
  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });
  return res
    .status(201)
    .json({ message: "Successfull generated", interviewReport });
};

export const interviewReport = async (req, res) => {
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found.",
    });
  }

  res.status(200).json({
    message: "Interview report fetched successfully.",
    interviewReport,
  });
};

export const allInterviewReport = async (req, res) => {
  const user = req.user;
  const interviewReports = await interviewReportModel
    .find({ user: user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );
  if (!interviewReports) {
    res.status(201).json({ message: "No report found" });
  }
  return res
    .status(201)
    .json({ message: "Reports succesfully fetched", interviewReports });
};
