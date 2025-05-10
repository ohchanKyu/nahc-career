import React, { useState } from "react";
import classes from "./IndustryDisasterPage.module.css";
import GraphComponent from "../components/IndustryDisasterPageComponents/GraphComponent";
import AllIndustryDisasterComponent from "../components/IndustryDisasterPageComponents/AllIndustryDisasterComponent";
import Header from "../components/LayoutComponents/Header";
import Footer from "../components/LayoutComponents/Footer";
import { motion, AnimatePresence } from "framer-motion";
import DiagnosisComponent from "../components/DiagnosisComponents/DiagnosisComponent";
import CheckListGeneratorComponent from "../components/DiagnosisComponents/CheckListGeneratorComponent";

const componentMap = {
    1: <GraphComponent />,
    2: <AllIndustryDisasterComponent />,
    3: <DiagnosisComponent />,
    4: <CheckListGeneratorComponent />,
};

const IndustryDisasterPage = () => {

    const [type, setType] = useState(1);

    return (
        <>
            <Header />
            <div className={classes.background}>
                <div className={classes.page}>
                    <h1 className={classes.title}>Safe WorkCare </h1>
                    <p className={classes.pageDescription}>
                        산업재해 예방을 위한 다양한 정보를 제공합니다. <br/>
                        통계 분석부터 사례 정보, 위험 진단, 예방 체크리스트까지 항목을 선택해 확인해보세요.
                    </p>
                    <div className={classes.buttonContainer}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className={classes.toggleButton}
                            onClick={() => setType(1)}
                        >
                            산업재해 통계 정보
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className={classes.toggleButton}
                            onClick={() => setType(2)}
                        >
                            산업재해 사례 정보
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className={classes.toggleButton}
                            onClick={() => setType(3)}
                        >
                            맞춤형 위험요인 진단
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className={classes.toggleButton}
                            onClick={() => setType(4)}
                        >
                            예방조치 체크리스트 작성
                        </motion.button>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={type}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {componentMap[type]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default IndustryDisasterPage;
