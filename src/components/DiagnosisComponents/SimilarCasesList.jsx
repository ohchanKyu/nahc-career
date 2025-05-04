import React from "react";
import classes from "./SimilarCasesList.module.css";
import { motion } from "framer-motion";
const SimilarCasesList = ({ cases }) => {
  
  return (
    <div className={classes.cases}>
      <motion.div className={classes.card_container}>
        {cases.map((item, index) => (
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
      </motion.div>
    </div>
  );
};

export default SimilarCasesList;
