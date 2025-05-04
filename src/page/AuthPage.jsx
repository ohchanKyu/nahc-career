import React, { useState, useEffect } from "react";
import classes from "./AuthPage.module.css";
import SignupContainer from "../components/AuthPageComponents/SignupContainer";
import LoginContainer from "../components/AuthPageComponents/LoginContainer";
import FindIdContainer from "../components/AuthPageComponents/FindIdContainer";
import FindPasswordContainer from "../components/AuthPageComponents/FindPasswordContainer";
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
import Footer from "../components/LayoutComponents/Footer";

const AuthPage = () => {

    const [type,setType] = new useState(1);
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const typeFromQuery = urlParams.get('type');
        setType(typeFromQuery ? parseInt(typeFromQuery) : 1);
    }, [location]);

    const links = [
        { type: 1, label: "로그인" },
        { type: 2, label: "회원가입" },
        { type: 3, label: "아이디 찾기" },
        { type: 4, label: "비밀번호 찾기" },
    ];

    const typeChangeHandler = (type) => {
        setType(type);
    };

    return (
        <>
            <div className={classes.page}>
                <div className={classes.wrapper}>
                    <div className={classes.auth_form}>
                        <div className={classes.header}>
                            <h1>Safe WorkCare </h1>
                            <p className={classes.description}>
                            현장 사고 예방을 위한 다양한 재해 정보와 예방조치 체크리스트를 제공합니다. <br/>
                            데이터 기반 분석과 AI 채팅 기능을 통해 맞춤형 진단을 지원하며, <br/>
                            로그인 후 서비스를 이용해보세요!
                            </p>
                        </div>
                        {type === 1 && <LoginContainer/>}
                        {type === 2 && <SignupContainer/>}
                        {type === 3 && <FindIdContainer/>}
                        {type === 4 && <FindPasswordContainer typeChangeHandler={typeChangeHandler}/>}
                        <div className={classes.link_wrapper}>
                            {links
                                .filter(link => link.type !== type)
                                .map(link => (
                                <motion.span 
                                    whileHover={{ color: '#10a37f'}}
                                    key={link.type} onClick={() => typeChangeHandler(link.type)} className={classes.link}>
                                    {link.label}
                                </motion.span>
                            ))}
                        </div>
                    </div> 
                </div>
            </div>
            <Footer/>
        </>
    )
};

export default AuthPage;