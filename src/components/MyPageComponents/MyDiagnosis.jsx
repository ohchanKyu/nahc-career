import React, { useEffect, useContext } from "react";
import classes from "./MyDiagnosis.module.css";
import { getAllDiagnosisResultService } from "../../api/DiagnosisService";
import { getAllChecklistService } from "../../api/CheckListService";
import loginContext from "../../store/login-context";

const MyDiagnosis = () => {
    
    const loginCtx = useContext(loginContext);
    const memberId = loginCtx.memberId;

    useEffect(() => {
        const fetchData = async () => {
            if (memberId) {
                const diagnosisResult = await getAllDiagnosisResultService(memberId);
                const checklistResult = await getAllChecklistService(memberId);
                console.log(diagnosisResult.data);
                console.log(checklistResult.data);
            }
        };
        fetchData();
    },[]);

    return (
        <div className={classes.container}>
            <h1>My Diagnosis</h1>
        </div>
    );
};

export default MyDiagnosis;