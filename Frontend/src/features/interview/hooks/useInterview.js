import { useContext } from "react"
import { InterviewContext } from "../interview.context"
import { getAllInterviewReport,generateInterviewReport,getInterviewReport } from "../services/interview.api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useInterview = () =>{
    const context = useContext(InterviewContext);
    const {interviewId} = useParams();
    const {loading,setLoading,report,setReport,reports,setReports} = context;
    
    const generateReport = async ({jobDescription,selfDescription,resume})=>{
        setLoading(true);
        try{
            const data = await generateInterviewReport({jobDescription,selfDescription,resume});
            setReport(data.interviewReport);
            return data.interviewReport
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        } 
    }

    const getReportbyId = async (interviewId) => {
        setLoading(true);
        try{
            const data = await getInterviewReport(interviewId);
            setReport(data.interviewReport);
            return data.interviewReport
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const getAllReports = async () => {
        setLoading(true);
        try{
            const data = await getAllInterviewReport();
            setReports(data.interviewReports);
            return data.interviewReports
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }


  useEffect(()=>{
    if(interviewId){
        getReportbyId(interviewId)
    }else{
        getAllReports()
    }
  },[interviewId])

    return {loading,setLoading,report,setReport,reports,setReports,generateReport,getAllReports,getReportbyId}
}