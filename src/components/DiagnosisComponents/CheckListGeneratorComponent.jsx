import React, { useState }  from 'react';
import classes from './CheckListGeneratorComponent.module.css';
import { motion } from "framer-motion";
import ChecklistGenerator from './CheckListGenerator';
import CheckListResult from './CheckListResult';

const CheckListGeneratorComponent = () => {

    const [checkList, setChecklist] = useState(null);
    const [userInput, setUserInput] = useState({});

    const handleResult = (result,userInput) => {
        setChecklist(result);
        setUserInput(userInput);
    };
    
    return (
        <div className={classes.pageWrapper}>
            <header className={classes.header}>
                <motion.h3
                    className={classes.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    예방조치 체크리스트 작성
                </motion.h3>
                <motion.p
                    className={classes.description}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
​                    예방조치 체크리스트는 사고를 미리 방지하기 위해 필요한 안전 조치를 정리한 목록입니다. <br/>
                    업무별 위험요소를 분석해, 필요한 보호구 착용이나 점검 항목을 빠짐없이 기록할 수 있습니다. <br/>
                    체계적인 체크리스트를 통해 사소한 위험까지 놓치지 않고, 사고 없는 작업장을 만들어보세요. <br/>
                </motion.p>
            </header>
            <div className={classes.sectionContainer}>
                <ChecklistGenerator onHandleResult={handleResult}/>
                {checkList && <CheckListResult userInput={userInput} checklist={checkList}/>}
            </div>
        </div>
    );

}

export default CheckListGeneratorComponent;