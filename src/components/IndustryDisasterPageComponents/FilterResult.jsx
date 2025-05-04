import React, { useState } from "react";
import classes from "./FilterResult.module.css";
import { motion, AnimatePresence } from 'framer-motion';
import KeywordFormModal from "./KeywordFormModal";

const FilterResult = (props) => {

    const { result, isSubmit } = props;
    const [isModal,setIsModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const showDetailsInfo = (item) => {
        setSelectedItem(item);
        setIsModal(true);
    };

    const closeModal = () => {
        setIsModal(false);
        setSelectedItem(null);
    };

    return (
        <div className={classes.resultsContainer}>
            <AnimatePresence>
                {isSubmit && result.length === 0 && (
                    <motion.p
                        className={classes.noResultsText}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        검색 결과가 존재하지 않습니다.
                    </motion.p>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {result.map((item,index) => (
                    <motion.div
                        onClick={() => showDetailsInfo(item)}
                        key={item.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={classes.resultItem}
                    >
                        <div className={classes.placeName}>{item.type}</div>
                        <div className={classes.regionCode}>{item.subJobType}</div>
                    </motion.div>
                ))}
            </AnimatePresence>
            <KeywordFormModal isOpen={isModal} onClose={closeModal}>
                {selectedItem && (
                    <div>
                    <h3 className={classes.jobType}>
                            {selectedItem.type} / {selectedItem.jobType}
                        </h3>
                        <p className={classes.description}>
                            <strong>단위 작업명</strong> <br/> 
                            {selectedItem.subJobType}
                        </p>
                        <p className={classes.description}>
                            <strong>재해 개요</strong> <br/> 
                            {selectedItem.description}
                        </p>
                        <p className={classes.reason}><strong>재해 유발 원인</strong> <br/>
                            {selectedItem.reason.trim()}
                        </p>
                        <p className={classes.reason}><strong>기인물 </strong> <br/>
                            {selectedItem.reasonThing.trim()}
                        </p>
                        <p className={classes.solution}>
                            <strong>위험성 감소 대책</strong><br />
                            {selectedItem.solution
                                .split("▶")
                                .filter(str => str.trim() !== "")
                                .map((text, idx) => (
                                    <span className={classes.solutionDesc} key={idx}>
                                    {idx === 0 ? `▶ ${text.trim()}` : <><br />▶ {text.trim()}</>}
                                    </span>
                            ))}
                        </p>
                    </div>
                )}
            </KeywordFormModal>
        </div>
    );
};

export default FilterResult;