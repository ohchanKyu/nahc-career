import React, { useState, useEffect } from 'react';
import styles from './ChecklistGenerator.module.css';
import { motion } from 'framer-motion';
import { getTypesService, 
  getJobTypesByTypeService, getSubJobTypesByJobTypeService } from "../../api/DangerousFactorService";
import { toast } from 'react-toastify';

function ChecklistGenerator(props) {
  
  const [types, setTypes] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [subJobTypes, setSubJobTypes] = useState([]);
  const [isSubmit,setIsSubmit] = useState(false);

  const [inputs, setInputs] = useState({
    type: '',
    jobType: '',
    subJobType: '',
    reason: '',
    difficulty: '',
    riskLevel: '',
    workTime: '',
  });

 useEffect(() => {
    const fetchTypes = async () => {
      const response = await getTypesService();
      setTypes(response.data || []);
    };
    fetchTypes();
  }, []); 

  useEffect(() => {
    if (inputs.type) {
      const fetchJobTypes = async () => {
        const response = await getJobTypesByTypeService(inputs.type);
        setJobTypes(response.data || []);
      };
      fetchJobTypes();
    } else {
      setJobTypes([]);
    }
  }, [inputs.type]); 

  useEffect(() => {
    if (inputs.jobType) {
      const fetchSubJobTypes = async () => {
        const response = await getSubJobTypesByJobTypeService(inputs.jobType);
        setSubJobTypes(response.data || []);
      };
      fetchSubJobTypes();
    } else {
      setSubJobTypes([]);
    }
  }, [inputs.jobType]);

  const handleChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const generateChecklist = async () => {
    
    setIsSubmit(true);
    if (inputs.reason.trim().length > 10){
      toast.warning("사고 키워드는 15자 이내로 입력해주세요.", {
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
    const isAnyEmpty = Object.entries(inputs).some(([key, value]) => value.trim() === '');
    
    if (isAnyEmpty) {
      toast.warning("모든 항목을 입력해주세요.", {
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
    const res = await fetch(`${import.meta.env.VITE_LLM_BACKEND_URL}/checklist`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "X-FRONTEND-TOKEN": `${import.meta.env.VITE_X_FRONTEND_KEY}`,
      },
      body: JSON.stringify({
          ...inputs,
          types : inputs.type,
      }),
    });
    const checklistData = await res.json();
    props.onHandleResult(checklistData.content,inputs);
    setIsSubmit(false);
    setInputs({
      type: '',
      jobType: '',
      subJobType: '',
      reason: '',
      difficulty: '',
      riskLevel: '',
      workTime: '',
    });
  };

 

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> 예방조치 체크리스트 생성기</h2>
      <div className={styles.formGroup}>
        <label className={styles.label}>공종 <span className={styles.required}>*</span></label>
        <select
          name="type"
          value={inputs.type}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">공종 선택</option>
          {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>작업명</label>
        <select
          name="jobType"
          value={inputs.jobType}
          onChange={handleChange}
          className={styles.select}
          disabled={!inputs.type}
        >
          <option value="">작업명 선택</option>
          {jobTypes.map((jobType) => (
            <option key={jobType} value={jobType}>{jobType}</option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
          <label className={styles.label}>단위 작업명</label>
          <select
            name="subJobType"
            value={inputs.subJobType}
            onChange={handleChange}
            className={styles.select}
            disabled={!inputs.jobType}
          >
          <option value="">단위 작업명 선택</option>
          {subJobTypes.map((subJobType) => (
              <option key={subJobType} value={subJobType}>{subJobType}</option>
          ))}
          </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>사고 키워드</label>
        <input
          type="text"
          name="reason"
          value={inputs.reason}
          onChange={handleChange}
          placeholder="EX) 전원 차단 없이 수리"
          className={styles.input}
        />
      </div>
      <div className={styles.formRowGroup}>
        <div className={styles.formRowSubGroup}>
          <label className={styles.labelRow}>작업 난이도</label>
          <select
            name="difficulty"
            value={inputs.difficulty}
            onChange={handleChange}
            className={styles.selectRow}
          >
            <option value="">선택</option>
            <option value="고">고</option>
            <option value="중">중</option>
            <option value="저">저</option>
          </select>
        </div>
        <div className={styles.formRowSubGroup}>
          <label className={styles.labelRow}>위험도</label>
          <select
            name="riskLevel"
            value={inputs.riskLevel}
            onChange={handleChange}
            className={styles.selectRow}
          >
            <option value="">선택</option>
            <option value="고">고</option>
            <option value="중">중</option>
            <option value="저">저</option>
          </select>
        </div>
        <div className={styles.formRowSubGroup}>
          <label className={styles.labelRow}>예상 작업 시간</label>
          <input
            min="1"
            type="number"
            name="workTime"
            value={inputs.workTime}
            onChange={handleChange}
            placeholder="시간 단위"
            className={styles.inputRow}
          />
        </div>
      </div>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        disabled={isSubmit} 
        onClick={generateChecklist} className={styles.button}>
        {isSubmit ? '생성중...' : '체크리스트 생성하기'}
      </motion.button>
    </div>
  );
}

export default ChecklistGenerator;
