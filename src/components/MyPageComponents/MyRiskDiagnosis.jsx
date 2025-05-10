import React, { useState } from "react";
import classes from "./MyRiskDiagnosis.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import MyRiskDiagnosisModal from "./MyRiskDiagnosisModal";
import { FaTrashAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const MyRiskDiganosis = ({ diagnosisResult, onDelete }) => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [isModal,setIsModal] = useState(false);

    const deleteChecklistHandler = async (id) => {
        onDelete(id);
    };
    const showDetailsInfo = (item) => {
        setSelectedItem(item);
        setIsModal(true);
    };
    const closeModal = () => {
        setIsModal(false);
        setSelectedItem(null);
    };
    return (
        <div className={classes.diagnosisContainer}>
            {diagnosisResult.length === 0 && <p className={classes.noResult}>아직 위험요인 진단이 존재하지 않습니다.</p>}
            <AnimatePresence>
                <motion.div 
                    className={classes.diagnosisContent}>
                    <AnimatePresence>
                        {diagnosisResult.map((item) => (
                            <motion.div key={item.id} 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                layout
                                className={classes.diagnosisItem}>
                                <div className={classes.totalRiskLevel} data-level={item.diagnosis}>
                                    <h2 className={classes.totalRiskLevelText}>전체 위험 레벨 <IoIosArrowForward/> {item.diagnosis}</h2>
                                </div>
                                <div className={classes.description}>
                                    {item.content}
                                </div>
                                <div className={classes.keywords}>
                                {item.riskKeywords
                                    .map((keyword, index) => {
                                        let scoreString = item.riskScores[index];  
                                        let numericScore;
                                        if (scoreString){
                                            numericScore = parseFloat(scoreString.replace('%', '')); 
                                            return (
                                                <div key={keyword} className={classes.keywordItem}>
                                                    <span className={classes.keywordText}>{keyword}</span>
                                                    <div className={classes.progressWrapper}>
                                                        <progress
                                                            value={numericScore}
                                                            max="100"
                                                            className={classes.progressBar}
                                                        ></progress>
                                                        <span className={classes.percentText}>
                                                            {scoreString}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        }else{
                                            return <></>
                                        }
                                    })}
                                </div>
                                <div className={classes.buttonContainer}>
                                    <button onClick={() => deleteChecklistHandler(item.id)}><FaTrashAlt/> 삭제하기</button>
                                    <button onClick={() => showDetailsInfo(item.similarCases)}><FaSearch/> 유사 사례</button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>
            <MyRiskDiagnosisModal isOpen={isModal} onClose={closeModal}>
                {selectedItem && (
                    <div className={classes.modalContent}>
                        {selectedItem && selectedItem.map(item => (
                            <div className={classes.cardContainer}>
                                <h3 className={classes.jobType}>
                                    {item.type} / {item.jobType}
                                </h3>
                                <p className={classes.jobDescription}>
                                    <strong>단위 작업명</strong> <br/> 
                                    {item.subJobType}
                                </p>
                                <p className={classes.jobDescription}>
                                    <strong>재해 개요</strong> <br/> 
                                    {item.description}
                                </p>
                                <p className={classes.reason}><strong>재해 유발 원인</strong> <br/>
                                    {item.reason.trim()}
                                </p>
                                <p className={classes.reason}><strong>기인물 </strong> <br/>
                                    {item.reasonThing.trim()}
                                </p>
                                <p className={classes.solution}>
                                    <strong>위험성 감소 대책</strong><br />
                                    {item.solution
                                        .split("▶")
                                        .filter(str => str.trim() !== "")
                                        .map((text, idx) => (
                                            <span className={classes.solutionDesc} key={idx}>
                                            {idx === 0 ? `▶ ${text.trim()}` : <><br />▶ {text.trim()}</>}
                                            </span>
                                    ))}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </MyRiskDiagnosisModal>
        </div>
    );
};

export default MyRiskDiganosis;