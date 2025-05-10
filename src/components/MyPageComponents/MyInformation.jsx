import React, { useContext, useState, useEffect } from "react";
import classes from "./MyInformation.module.css";
import { motion, AnimatePresence } from "framer-motion";   
import loginContext from "../../store/login-context";
import { getMemberService, deleteMemberService, logoutService } from "../../api/MemberService";
import { getAllDiagnosisResultService } from "../../api/DiagnosisService";
import { getAllChecklistService } from "../../api/CheckListService";
import { getAllChatSectionsService } from "../../api/LLMChatSectionService";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegChartBar } from "react-icons/fa";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../LayoutComponents/Loading";

const MyInformation = () => {  

    const [memberInfo,setMemberInfo] = useState(null);
    const [isModal,setIsModal] = useState(false);
    const [isWait,setIsWait] = useState(false);

    const loginCtx = useContext(loginContext);
    const memberId = loginCtx.memberId;
    const navigate = useNavigate();

    const confirmDelete = async () => {
        setIsModal(false);
        setIsWait(true);
        const logoutResponseData = await logoutService();
        if (logoutResponseData.success){
            const deleteResponseData = await deleteMemberService(memberId);
            if (deleteResponseData.success){
                toast.success("계정이 탈퇴 처리되었습니다.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsWait(false);
                navigate('/auth');
            }
            loginCtx.logoutUser();
        }else{
            toast.warning("일시적 오류입니다. \n 다시 로그인 후 진행해주세요.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setIsWait(false);
    };

    const showModal = () => {
        setIsModal(true);
    };

    const closeModal = () => {
        setIsModal(false);
    };

    useEffect(() => {
        const fetchMemberData = async () => {
            setIsWait(true);
            const memberResponse = await getMemberService(memberId);
            const diagnosisResult = await getAllDiagnosisResultService(memberId);
            const checklistResult = await getAllChecklistService(memberId);
            const chatSectionResult = await getAllChatSectionsService(memberId);
            setMemberInfo({
                ...memberResponse.data,
                checklistCount : checklistResult.data.length,
                diagnosisCount : diagnosisResult.data.length,
                chatSectionCount : chatSectionResult.data.length
            });
            setIsWait(false);
        };
        fetchMemberData();
    },[memberId]);

    return (
        <>
            {isWait && <Loading/>}
            <AnimatePresence>
                {memberInfo && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className={classes.container}
                    >
                        <div className={classes.card}>
                            <h2 className={classes.sectionTitle}><IoSettingsSharp/> 기본 정보</h2>
                            <div className={classes.infoItem}><span>이름</span><p>{memberInfo.name}</p></div>
                            <div className={classes.infoItem}><span>사용자 권한</span><p>{memberInfo.roles === "ROLE_USER" ? "사용자" : "관리자" }</p></div>
                            <div className={classes.infoItem}><span>가입 이메일</span><p>{memberInfo.email}</p></div>
                            <div className={classes.infoItem}><span>아이디</span><p>{memberInfo.userId}</p></div>
                            <div className={classes.infoItem}><span>가입일</span><p>{memberInfo.createTime.split('T')[0]}</p></div>
                        </div>
                        <div className={classes.card}>
                            <h2 className={classes.sectionTitle}><FaRegChartBar/> 서비스 활동 통계</h2>
                            <div className={classes.infoItem}><span>체크리스트 생성 개수</span><p>{`${memberInfo.checklistCount}개`}</p></div>
                            <div className={classes.infoItem}><span>체크리스트 다운로드 횟수</span><p>{`${memberInfo.downloadCount}회`}</p></div>
                            <div className={classes.infoItem}><span>위험요인 진단 개수</span><p>{`${memberInfo.diagnosisCount}개`}</p></div>
                            <div className={classes.infoItem}><span>AI 채팅방 개수</span><p>{`${memberInfo.chatSectionCount}개`}</p></div>
                            <button className={classes.deleteButton} onClick={showModal}>회원탈퇴</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {memberInfo && isModal && (
                <DeleteModal isOpen={isModal} onClose={closeModal}>
                    <div className={classes.modal_content}>
                        <h2 className={classes.modal_title}>회원 탈퇴 확인</h2>
                        <p className={classes.text}>
                            정말로 탈퇴하시겠습니까? <br/>
                            탈퇴하시면 이용중인 서비스가 폐쇄되며 <br/>
                            모든 데이터는 복구 불가입니다.
                        </p>
                        <div className={classes.info_box}>
                            <p className={classes.info}><strong>이름:</strong> {memberInfo.name}</p>
                            <p className={classes.info}><strong>이메일:</strong> {memberInfo.email}</p>
                        </div>
                        <ul className={classes.check_list}>
                            <li className={classes.check_one}>
                                AI 채팅, 진단 기록, 체크리스트, 프로필 등 모든 정보가 삭제됩니다.
                            </li>
                            <li className={classes.check_two}>
                                이전 정보는 모두 삭제되며 필요한 데이터는 미리 백업을 해주세요.
                            </li>
                        </ul>
                        <div className={classes.modal_btns}>
                            <motion.button 
                                whileHover={{ scale : 1.05 }}
                                className={classes.confirm_btn} onClick={confirmDelete}>탈퇴하기</motion.button>
                            <motion.button 
                                whileHover={{ scale : 1.05 }}
                                className={classes.cancel_btn} onClick={() => closeModal(false)}>취소하기</motion.button>
                        </div>
                    </div>
                </DeleteModal>
            )}
        </>
    );
};

export default MyInformation;