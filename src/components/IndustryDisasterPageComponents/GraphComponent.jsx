import React, { useState } from "react";
import { motion } from "framer-motion";
import classes from "./GraphComponent.module.css";
import GraphList from "./GraphList";

const GRAPH_TITLES = [
    "규모별 사망자수",
    "규모별 재해자수",
    "규모별 재해율",
    "성별 사망자수",
    "성별 재해자수",
    "연령별 사망자수",
    "연령별 재해자수",
    "산업 중 분류별 재해자수"
];

const GraphComponent = () => {
    
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <>
            <div className={classes.pageWrapper}>
                <header className={classes.header}>
                    <motion.h3
                        className={classes.title}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        산업재해 통계 자료
                    </motion.h3>
                    <motion.p
                        className={classes.subtitle}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        기업 규모 및 산업 분류에 따른 연도별 데이터 시각화
                    </motion.p>
                    <motion.p
                        className={classes.description}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1  }}
                    >
                        산업재해 통계 데이터를 다양한 기준으로 시각화하여 제공합니다. <br />
                        기업 규모, 성별, 연령, 산업 분류 등을 기준으로 사망자 수와 재해자 수의 변화를 확인할 수 있습니다. <br/>
                        산업 현장에서 발생하는 재해의 데이터를 시각화하여, <strong>기업 정책 수립</strong>과 <strong>예방 전략</strong>에 도움을 줄 수 있습니다. <br />
                        기업 규모, 성별, 연령, 산업 분류별 데이터를 통해 <strong>재해 원인을 심층 분석</strong>해 보세요.
                    </motion.p>
                </header>

                <div className={classes.all_wrapper}>
                    <div className={classes.buttonGroup}>
                        {GRAPH_TITLES.map((title, idx) => (
                            <motion.button
                                key={idx}
                                className={`${classes.tabButton} ${selectedIndex === idx ? classes.active : ""}`}
                                onClick={() => setSelectedIndex(idx)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {title}
                            </motion.button>
                        ))}
                    </div>
                    <GraphList selectedIndex={selectedIndex} />
                </div>
            </div>
        </>
    );
};

export default GraphComponent;
