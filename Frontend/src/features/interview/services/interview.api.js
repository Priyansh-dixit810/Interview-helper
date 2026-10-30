import axios from "axios";

const api = axios.create({baseURL: "http://localhost:3000",withCredentials: true})
/**
 * @description This function is used to generate interview report on the basis of user input
 * @param {Object} param0 
 * @param {String} param0.resume - Resume file in base64 format
 * @param {String} param0.jobDescription - Job description
 * @param {String} param0.selfDescription - Self description
 * @returns 
 */
export const generateInterviewReport  = async ({resume,jobDescription,selfDescription}) => {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);

    const response = await api.post("/api/interview",formData,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data;
}
/**
 * 
 * @description This function is used to get all interview reports of the user
 * @param {Object} param0 
 * @param {String} param0.resume - Resume file in base64 format
 * @param {String} param0.jobDescription - Job description
 * @param {String} param0.selfDescription - Self description
 * @returns 
 */
export const getAllInterviewReport = async () =>{
    const response = await api.get("/api/interview");
    return response.data;
}
/**
 * 
 * @description This function is used to get a single interview report of the user
 * @param {String} interviewId - Interview report id
 * @returns  
 */
export const getInterviewReport = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
}