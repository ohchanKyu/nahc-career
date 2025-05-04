import React, { useEffect, useState, useRef, useCallback } from "react";
import classes from "./AllIndustryDisaster.module.css";
import { getAllDangerousFactorService } from "../../api/DangerousFactorService";
import { motion } from "framer-motion";

const AllIndustryDisaster = () => {

    const [data, setData] = useState([]);
    const [displayedResults, setDisplayedResults] = useState([]);
    const [page, setPage] = useState(1);
    const loaderRef = useRef(null);
    const observerRef = useRef(null);

    const fetchAllDatas = async () => {
        const response = await getAllDangerousFactorService();
        setData(response.data || []);
    };

    useEffect(() => {
        fetchAllDatas();
    }, []);

    useEffect(() => {
        if (data.length === 0) return;
    
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && displayedResults.length < data.length) {
              const nextPage = page + 1;
              setPage(nextPage);
              setDisplayedResults(data.slice(0, nextPage * 20));
            }
          },
          { threshold: 1.0 }
        );
    
        if (observerRef.current) observer.observe(observerRef.current);
    
        return () => observer.disconnect();
      }, [data, displayedResults, page]);

    return (
        <div className={classes.page}>
            <h2 className={classes.pageTitle}>모든 산업재해 사례 정보</h2>
            <motion.div className={classes.card_container}>
                {displayedResults.map((item, index) => (
                    <motion.div
                        key={index}
                        className={classes.card}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className={classes.jobType}>
                            {item.type} / {item.jobType}
                        </h3>
                        <p className={classes.description}>
                            <strong>단위 작업명</strong> <br />
                            {item.subJobType}
                        </p>
                        <p className={classes.description}>
                            <strong>재해 개요</strong> <br />
                            {item.description}
                        </p>
                        <p className={classes.reason}>
                            <strong>재해 유발 원인</strong> <br />
                            {item.reason.trim()}
                        </p>
                        <p className={classes.reason}>
                            <strong>기인물</strong> <br />
                            {item.reasonThing.trim()}
                        </p>
                        <p className={classes.solution}>
                            <strong>위험성 감소 대책</strong><br />
                            {item.solution
                                .split("▶")
                                .filter(str => str.trim() !== "")
                                .map((text, idx) => (
                                    <span key={idx} className={classes.solutionDesc}>
                                        {idx === 0 ? `▶ ${text.trim()}` : <><br />▶ {text.trim()}</>}
                                    </span>
                                ))}
                        </p>
                    </motion.div>
                ))}
                <div ref={observerRef}/>
                <div ref={loaderRef} className={classes.loader}>
                    데이터를 준비중입니다. <br/>
                    잠시만 기다려주세요.
                </div>
            </motion.div>
        </div>
    );
};

export default AllIndustryDisaster;
