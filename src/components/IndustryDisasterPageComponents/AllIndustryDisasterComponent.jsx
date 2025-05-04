import React from "react";
import classes from "./AllIndustryDisasterComponent.module.css";
import { motion } from "framer-motion";
import AllIndustryDisaster from "./AllIndustryDisaster";
import IndustryFilter from "./IndustryFilter";

const AllIndustryDisasterComponent = () => {

    return (
        <div className={classes.pageWrapper}>
            <header className={classes.header}>
                <motion.h3
                    className={classes.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    산업재해 사례 분석
                </motion.h3>
                <motion.p
                    className={classes.description}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    실제 산업재해 사례를 바탕으로 사고 발생 원인과 예방 방안을 확인할 수 있습니다. <br/>
                    업종별로 다양한 사고 유형을 필터링하고, 키워드 검색을 통해 필요한 정보를 빠르게 찾을 수 있습니다. <br/>
                    반복되는 재해를 줄이기 위해 유사 사례를 분석하고 체계적인 대응 전략을 수립해보세요.
                </motion.p>
            </header>
            <div className={classes.sectionContainer}>
                <AllIndustryDisaster />
                <IndustryFilter/>
            </div>
        </div>
    );

};

export default AllIndustryDisasterComponent;