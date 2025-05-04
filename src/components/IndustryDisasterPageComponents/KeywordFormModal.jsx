// src/components/common/Modal.js
import React from 'react';
import { motion } from 'framer-motion';
import classes from './KeywordFormModal.module.css';
import { IoIosCloseCircle } from "react-icons/io";

const KeywordFormModal = ({ isOpen, onClose, children }) => {

  if (!isOpen) return null;

  return (
    <div className={classes.backdrop} onClick={onClose}>
      <motion.div
        className={classes.modal}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button 
            whileHover={{ scale: 1.05 }}
            className={classes.closeButton} onClick={onClose}>
            <IoIosCloseCircle size={30} color="#000" />
        </motion.button>
        {children}
      </motion.div>
    </div>
  );
};

export default KeywordFormModal;
