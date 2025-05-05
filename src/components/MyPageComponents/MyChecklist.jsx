import React , { useState }from "react";
import classes from "./MyChecklist.module.css";
import { downloadCheckListPdfService } from "../../api/CheckListService";
import MyChecklistModal from "./MyChecklistModal";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { BiSolidNavigation } from "react-icons/bi";

const MyChecklist = ({ checklist, onDelete, memberId }) => {

    const orderedStages = ['작업 전', '작업 중', '작업 후'];
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModal,setIsModal] = useState(false);

    const showDetailsInfo = (item) => {
        const grouped = {
            "작업 전": [],
            "작업 중": [],
            "작업 후": []
        };
        item.checklist.forEach(item => {
            const key = item.stage;
            if (grouped[key]) {
                grouped[key].push(item);
            }
        });
        setSelectedItem(grouped);
        setIsModal(true);
    };

    const closeModal = () => {
        setIsModal(false);
        setSelectedItem(null);
    };

    const deleteChecklistHandler = async (id) => {
        onDelete(id);
    };

    const pdfDownloadHandler = async (item) => {
        const downloadResponse = await downloadCheckListPdfService(memberId,{
            checkListForm : item.forms,
            checkListResultList : item.checklist
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
    return (
        <div className={classes.checklistContainer}>
            {checklist.length === 0 && <p className={classes.noResult}>아직 체크리스트가 존재하지 않습니다.</p>}
            <AnimatePresence>
                <motion.div 
                    className={classes.checklistContent}>
                    <AnimatePresence>
                        {checklist.map((item) => (
                            <motion.div key={item.id} 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                layout
                                className={classes.checklistItem}>
                                <div className={classes.itemContainer}>
                                    <p className={classes.type}>{item.forms.type} / {item.forms.jobType}</p>
                                    <p className={classes.subJobType}>{item.forms.subJobType}</p>
                                    <p className={classes.reason}>사고 키워드 <FaArrowRight/> {item.forms.reason}</p>
                                    <div className={classes.rowContainer}>
                                        <p className={classes.difficulty}>작업 난이도 <FaArrowRight/> {item.forms.difficulty}</p>
                                        <p className={classes.riskLevel}>위험도 <FaArrowRight/> {item.forms.riskLevel}</p>
                                        <p className={classes.workTime}>작업 시간 <FaArrowRight/> {item.forms.workTime}시간</p>
                                    </div>
                                </div>
                                <div className={classes.buttonContainer}>
                                    <button onClick={() => deleteChecklistHandler(item.id)}><FaTrashAlt/> 삭제하기</button>
                                    <button onClick={() => pdfDownloadHandler(item)}><FaFilePdf/> 다운로드</button>
                                    <button onClick={() => showDetailsInfo(item)}><BiSolidNavigation/> 상세보기</button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>
            <MyChecklistModal isOpen={isModal} onClose={closeModal}>
                {selectedItem && (
                    <div className={classes.modalContent}>
                        {orderedStages.map(stage => (
                            selectedItem[stage].length > 0 && (
                            <div key={stage} className={classes.stageSection}>
                                <h3 className={classes.stageTitle}>{`[ ${stage} ]`}</h3>
                                <ul className={classes.list}>
                                {selectedItem[stage].map((item, i) => (
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
                    </div>
                )}
            </MyChecklistModal>
        </div>
    );
};

export default MyChecklist;