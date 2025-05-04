import React, { useState } from 'react';
import classes from './DiagnosisComponent.module.css';
import { motion } from "framer-motion";
import DiagnosisForm from './DiagnosisForm';
import DiagnosisResult from './DiagnosisResult';

const DiagnosisComponent = () => {

    const [diagnosisResult,setDiagnosisResult] = useState(null);

    const handleResult = (result) => {
        setDiagnosisResult(result);
    };

    return (
        <div className={classes.pageWrapper}>
            <header className={classes.header}>
                <motion.h3
                    className={classes.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    맞춤형 위험요인 진단
                </motion.h3>
                <motion.p
                    className={classes.description}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
​                    맞춤형 위험요인 진단은 사업장별 특성을 고려해 숨은 위험요소를 찾아내는 과정입니다. <br/>
                    작업 환경과 업무 형태를 분석해, 사고를 유발할 수 있는 요인을 사전에 파악합니다. <br/>
                    진단 결과를 통해 사업장에 꼭 맞는 예방 대책을 세우고 안전한 작업환경을 만들어보세요. <br/>
                </motion.p>
            </header>
            <div className={classes.sectionContainer}>
                <DiagnosisForm onHandleResult={handleResult}/>
                {diagnosisResult && <DiagnosisResult result={diagnosisResult}/>}
            </div>
        </div>
    );

}

export default DiagnosisComponent;