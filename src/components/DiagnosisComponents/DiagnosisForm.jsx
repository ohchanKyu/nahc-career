import React, { useState, useEffect } from "react";
import classes from "./DiagnosisForm.module.css";
import { getTypesService } from "../../api/DangerousFactorService";
import { getDiagnosisResultService } from "../../api/DiagnosisService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const DiagnosisForm = (props) => {

  const [types, setTypes] = useState([]);
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmit,setIsSubmit] = useState(false);
  
  useEffect(() => {
    const fetchTypes = async () => {
        const response = await getTypesService();
        setTypes(response.data || []);
    };
    fetchTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (jobType.trim() === ""){
        toast.warning("공종을 선택해주세요.", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        }); 
        setIsSubmit(false);
        return;
    }
    if (description.trim() === "") {
        toast.warning("작업 설명을 간략하게라도 적어주세요.", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        }); 
        setIsSubmit(false);
        return;
    }
    if (description.trim().length > 400) {
      toast.warning("최대 400자까지만 입력가능합니다.", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
      }); 
      setIsSubmit(false);
      return;
  }
    const diagnosisResponse = await getDiagnosisResultService(jobType, description);  
    const res = await fetch(`${import.meta.env.VITE_LLM_BACKEND_URL}/diagnosis`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "X-FRONTEND-TOKEN": `${import.meta.env.VITE_X_FRONTEND_KEY}`,
      },
      body: JSON.stringify({
          keywords : diagnosisResponse.data.riskKeywords,
          description : description,
      }),
    });
    const diagnosisData = await res.json();
    props.onHandleResult({
      diagnosisData,
      diagnosisCal: diagnosisResponse.data,
    });
    setJobType("");
    setDescription("");
    setIsSubmit(false);
 };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="jobType">공종 선택</label>
        <select
          id="jobType"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">공종 선택</option>
          {types.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="description">작업 환경</label>
        <textarea
          className={classes.textarea}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="작업 환경과 업무 형태를 구체적으로 입력해주세요."
        />
      </div>
      <div className={classes.descriptionCount}
        style={{
          textAlign: "right",
          marginTop: "4px",
          fontSize: "0.85rem",
          color: description.length > 400 ? "red" : "white",
        }}>
        {description.length} / 400자
      </div>
      <div className={classes.actions}>
            <motion.button disabled={isSubmit} 
                whileHover={{ scale: 1.05 }}
                type="submit" className={classes.button}>{isSubmit ? '진단중...' : '진단하기'}
            </motion.button>
      </div>
    </form>
  );
};

export default DiagnosisForm;
