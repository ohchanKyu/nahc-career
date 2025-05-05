import React, { useEffect, useContext, useState } from "react";
import classes from "./MyDiagnosis.module.css";
import { getAllDiagnosisResultService } from "../../api/DiagnosisService";
import { getAllChecklistService, deleteChecklistService } from "../../api/CheckListService";
import { deleteDiagnosisResultService } from "../../api/DiagnosisService";
import loginContext from "../../store/login-context";
import { motion, AnimatePresence } from "framer-motion";
import MyChecklist from "./MyChecklist";
import { toast } from "react-toastify";
import MyRiskDiganosis from "./MyRiskDiagnosis";

const MyDiagnosis = () => {
    
    const [checklist, setChecklist] = useState(null);
    const [diagnosisResult, setDiagnosisResult] = useState(null);
    const loginCtx = useContext(loginContext);
    const memberId = loginCtx.memberId;

    const deleteDiagnosisHandler = async (id) => {
        const deleteResponse = await deleteDiagnosisResultService(id);
        if (deleteResponse.success && deleteResponse.data){
            toast.success("진단 결과를 삭제하였습니다.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            }); 
        }else{
            toast.error("삭제를 실패하였습니다. \n 다시 시도해주세요.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            }); 
        }
        fetchData();
    };

    const deleteChecklistHandler = async (id) => {
        const deleteResponse = await deleteChecklistService(id);
        if (deleteResponse.success && deleteResponse.data){
            toast.success("체크리스트를 삭제하였습니다.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            }); 
        }else{
            toast.error("삭제를 실패하였습니다. \n 다시 시도해주세요.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            }); 
        }
        fetchData();
    };

    const fetchData = async () => {
        if (memberId) {
            const diagnosisResult = await getAllDiagnosisResultService(memberId);
            const checklistResult = await getAllChecklistService(memberId);
            setDiagnosisResult(diagnosisResult.data);
            setChecklist(checklistResult.data);
        }
    };
    
    useEffect(() => {
        fetchData();
    },[]);

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className={classes.container}>
                <div className={classes.resultContainer}>
                    <div className={classes.riskContainer}>
                        <h2 className={classes.checklistHeader}># 나의 위험 진단</h2>
                        {diagnosisResult && <MyRiskDiganosis onDelete={deleteDiagnosisHandler} diagnosisResult={diagnosisResult}/>}
                        
                    </div>
                    <div className={classes.checklistContainer}>
                        <h2 className={classes.checklistHeader}># 나의 체크리스트</h2>
                        {checklist &&  <MyChecklist 
                            memberId={memberId}
                            onDelete={deleteChecklistHandler} checklist={checklist} />}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MyDiagnosis;