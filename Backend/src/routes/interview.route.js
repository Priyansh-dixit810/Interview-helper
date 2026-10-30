import express from "express";
import authuser from "../middleware/auth.middleware.js";
import { allInterviewReport, generateInterviewReportController, interviewReport } from "../controller/interview.controller.js";
import { upload } from "../middleware/file.middleware.js";

const interviewRoute = express.Router();
/**
 * @route POST /api/interview
 * @description generate a interview report on the basis of user input
 * @access private
 */
interviewRoute.post("/",authuser,upload.single('resume'),generateInterviewReportController)
interviewRoute.get("/",authuser,allInterviewReport)
interviewRoute.get("/report/:interviewId",authuser,interviewReport)

export default interviewRoute; 