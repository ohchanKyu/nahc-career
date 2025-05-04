import React from "react";
import classes from "./CheckListResult.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { downloadCheckListPdfService } from '../../api/CheckListService';
import { FaCheckDouble } from "react-icons/fa";

const CheckListResult = ({ checklist, userInput }) => {

  const downloadPdf = async () => {
    const downloadResponse = await downloadCheckListPdfService({
      checkListForm : userInput,
      checkListResultList : checklist
    });
    const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    const today = new Date().toISOString().slice(0, 10);
    const filename = `[${today}] 예방조치 체크리스트.pdf`;
    
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const grouped = {
    "작업 전": [],
    "작업 중": [],
    "작업 후": []
  };

  checklist.forEach(item => {
    const key = item.stage;
    if (grouped[key]) {
      grouped[key].push(item);
    }
  });
  const orderedStages = ['작업 전', '작업 중', '작업 후'];

  return (
    <AnimatePresence>
      {checklist.length > 0 && (
        <motion.div
          className={classes.resultContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className={classes.resultTitle}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaCheckDouble /> 체크리스트 생성 결과
          </motion.h2>

          {orderedStages.map(stage => (
            grouped[stage].length > 0 && (
              <div key={stage} className={classes.stageSection}>
                <h3 className={classes.stageTitle}>{`[ ${stage} ]`}</h3>
                <ul className={classes.list}>
                  {grouped[stage].map((item, i) => (
                    <motion.li
                      key={i}
                      className={classes.listItem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <p className={classes.content}>
                        {item.content}
                      </p>
                      <span
                        className={`${classes.importance} ${classes[item.importance?.toLowerCase()]}`}
                      >
                        {item.importance}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )
          ))}
          <div className={classes.buttonContainer}>
            <motion.button
              onClick={downloadPdf}
              className={classes.downloadButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PDF 다운로드
            </motion.button>
            <motion.button
              className={classes.saveButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              결과 저장하기
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckListResult;
