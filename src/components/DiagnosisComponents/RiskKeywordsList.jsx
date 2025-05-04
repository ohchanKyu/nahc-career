import React from "react";
import classes from "./RiskKeywordsList.module.css";
import { IoIosArrowForward } from "react-icons/io";

const RiskKeywordsList = ({ keywords, scores, level, description }) => {

  return (
    <div className={classes.container}>
      <div className={classes.totalRiskLevel} data-level={level}>
        <h2 className={classes.totalRiskLevelText}>전체 위험 레벨 <IoIosArrowForward/> {level}</h2>
      </div>
      <div className={classes.description}>
        {description}
      </div>
      <div className={classes.keywords}>
        {keywords
          .filter((keyword) => {
            const value = scores[keyword];
            return !isNaN(value) && value !== undefined && value !== null;
          })
          .map((keyword) => (
            <div key={keyword} className={classes.keywordItem}>
              <span className={classes.keywordText}>{keyword}</span>
              <div className={classes.progressWrapper}>
                <progress
                  value={scores[keyword] * 100}
                  max="100"
                  className={classes.progressBar}
                ></progress>
                <span className={classes.percentText}>
                  {(scores[keyword] * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RiskKeywordsList;
