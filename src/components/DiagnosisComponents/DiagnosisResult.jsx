import React, { useState } from "react";
import classes from "./DiagnosisResult.module.css";
import RiskKeywordsList from "./RiskKeywordsList";
import { motion, AnimatePresence } from "framer-motion";
import SimilarCasesList from "./SimilarCasesList";
import { FaCheckDouble } from "react-icons/fa";

const DiagnosisResult = ({ result }) => {

    const [activeTab, setActiveTab] = useState("risk");

    return (
        <AnimatePresence>
            <motion.div
                className={classes.resultContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h2
                    className={classes.resultTitle}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <FaCheckDouble /> 진단 결과
                </motion.h2>
                <p className={classes.tabSelector}>
                    <span
                        className={activeTab === "risk" ? classes.activeTab : ""}
                        onClick={() => setActiveTab("risk")}
                    >
                        주요 위험 키워드 및 분석
                    </span>
                    <span
                        className={activeTab === "cases" ? classes.activeTab : ""}
                        onClick={() => setActiveTab("cases")}
                    >
                        유사 사고 사례 예시
                    </span>
                </p>
                <motion.div
                    className={classes.resultContent}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {activeTab === "risk" && (
                        <motion.div
                            className={classes.riskKeywords}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <RiskKeywordsList 
                                keywords={result.diagnosisCal.riskKeywords}
                                description={result.diagnosisData.content}
                                scores={result.diagnosisCal.riskScores}
                                level={result.diagnosisData.diagnosis} 
                            />
                        </motion.div>
                    )}
                    {activeTab === "cases" && (
                        <motion.div
                            className={classes.similarCases}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <SimilarCasesList cases={result.diagnosisCal.similarCases} />
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DiagnosisResult;
