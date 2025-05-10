import React, { useState } from "react";
import classes from "./IndustryFilter.module.css";
import { motion } from "framer-motion";
import KeywordForm from "./KeywordForm";
import FilterForm from "./FilterForm";
const IndustryFilter = () => {

    const [type,setType] = useState(1);

    return (
        <div className={classes.page}>
            <h2 className={classes.pageTitle}>산업재해 사례 정보 검색</h2>
            <div className={classes.buttonContainer}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className={classes.toggleButton}
                    onClick={() => setType(1)}
                >
                    키워드 검색
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className={classes.toggleButton}
                    onClick={() => setType(2)}
                >
                    필터링 검색
                </motion.button>
            </div>
            {type === 1 && <KeywordForm/>}
            {type === 2 && <FilterForm/>}
        </div>
    );
};

export default IndustryFilter;