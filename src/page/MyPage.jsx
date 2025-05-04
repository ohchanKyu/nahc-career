import React, { useState, useContext } from "react";
import classes from "./MyPage.module.css";
import Header from "../components/LayoutComponents/Header";
import Footer from "../components/LayoutComponents/Footer";
import MyInformation from "../components/MyPageComponents/MyInformation";
import MyDiagnosis from "../components/MyPageComponents/MyDiagnosis";
import loginContext from "../store/login-context";

const MyPage = () => {

    const [option,setOption] = useState(1);
    const loginCtx = useContext(loginContext);
    const memberId = loginCtx.memberId;

    return (
        <>
            <Header/>
            <div className={classes.background}>
                <div className={classes.page}>
                    <h1 className={classes.title}>Safe WorkCare</h1>
                    <div className={classes.selectContainer}>
                        <button className={option === 1 ? classes.selected : classes.unselected} onClick={() => setOption(1)}>My Information</button>
                        <button className={option === 2 ? classes.selected : classes.unselected} onClick={() => setOption(2)}>My Diagnosis</button>
                   </div>
                    <div className={classes.sectionContainer}>
                        {option === 1 && memberId && <MyInformation memberId={memberId}/>}
                        {option === 2 && memberId && <MyDiagnosis  memberId={memberId}/>}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MyPage;