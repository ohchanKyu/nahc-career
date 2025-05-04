import React, { useState, useEffect } from 'react';
import { getTypesService, getJobTypesByTypeService, 
    getSubJobTypesByJobTypeService,
    getDangerSituationByFilterService
 } from '../../api/DangerousFactorService';
import styles from './FilterForm.module.css';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import FilterResult from './FilterResult';

const FilterForm = () => {

  const [types, setTypes] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [subJobTypes, setSubJobTypes] = useState([]);
  const [result,setResult] = useState([]);
  const [isSubmitResult,setIsSubmitResult] = useState(false);
  const [isSubmit,setIsSubmit] = useState(false);

  const [formData, setFormData] = useState({
    type: '',
    jobType: '',
    subJobType: '',
  });

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await getTypesService();
      setTypes(response.data || []);
    };

    fetchTypes();
  }, []); 

  useEffect(() => {
    if (formData.type) {
      const fetchJobTypes = async () => {
        const response = await getJobTypesByTypeService(formData.type);
        setJobTypes(response.data || []);
        setFormData(prev => ({
          ...prev,
          jobType: '', 
          subJobType: '',
        }));
      };
      fetchJobTypes();
    } else {
      setJobTypes([]); 
      setSubJobTypes([]); 
    }
  }, [formData.type]);

  useEffect(() => {
    if (formData.jobType) {
      const fetchSubJobTypes = async () => {
        const response = await getSubJobTypesByJobTypeService(formData.jobType);
        setSubJobTypes(response.data || []);
      };
      fetchSubJobTypes();
    } else {
      setSubJobTypes([]);
    }
  }, [formData.jobType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (formData.type === '') {
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
    const filterResponse = await getDangerSituationByFilterService(formData);
    setResult(filterResponse.data);
    setIsSubmitResult(true);
    setFormData({
        type: '',
        jobType: '',
        subJobType: '',
    });
    setIsSubmit(false);
  };

  return (
    <>
        <motion.form 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
            <label className={styles.label}>공종 <span className={styles.required}>*</span></label>
            <select
            name="type"
            value={formData.type}
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
            value={formData.jobType}
            onChange={handleChange}
            className={styles.select}
            disabled={!formData.type}
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
            value={formData.subJobType}
            onChange={handleChange}
            className={styles.select}
            disabled={!formData.jobType}
            >
            <option value="">단위 작업명 선택</option>
            {subJobTypes.map((subJobType) => (
                <option key={subJobType} value={subJobType}>{subJobType}</option>
            ))}
            </select>
        </div>
        <motion.button disabled={isSubmit} 
            whileHover={{ scale: 1.05 }}
            type="submit" className={styles.button}>{isSubmit ? '검색중...' : '검색하기'}</motion.button>
        </motion.form>
        {isSubmitResult && <FilterResult isSubmit={isSubmitResult} result={result}/>}
    </>
    
  );
};

export default FilterForm;
