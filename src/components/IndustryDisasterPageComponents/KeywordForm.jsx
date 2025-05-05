import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDangerousFactorByKeywordService } from '../../api/DangerousFactorService';
import classes from './KeywordForm.module.css';
import KeywordFormModal from './KeywordFormModal';

const useDebounce = (value, delay) => {

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const KeywordForm = () => {

  const [query, setQuery] = useState('');
  const [isModal,setIsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // <-- 추가
  const debouncedQuery = useDebounce(query, 400);
  const [results, setResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [noResultsMessageVisible, setNoResultsMessageVisible] = useState(false);
  const [initialMessageVisible, setInitialMessageVisible] = useState(true);
  const observerRef = useRef(null);
 
  const showDetailsInfo = (item) => {
    setSelectedItem(item);
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery.trim() === '') {
        setResults([]); 
        setDisplayedResults([]); 
        setNoResultsMessageVisible(false);
        setInitialMessageVisible(true);
        return;
      }
  
      setLoading(true);
      setError(null);
      setInitialMessageVisible(false);
      try {
        const dangerousFactorResponse = await getDangerousFactorByKeywordService(debouncedQuery);
        if (dangerousFactorResponse.success) {
          setResults(dangerousFactorResponse.data.keywordResponses);
          setDisplayedResults(dangerousFactorResponse.data.keywordResponses.slice(0, 20));
          setNoResultsMessageVisible(dangerousFactorResponse.data.keywordResponses.length === 0); 
        } else {
          setError('검색 결과를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setError('검색 중 오류가 발생했습니다.');
      }
      setLoading(false);
    };
    fetchData();
  }, [debouncedQuery]);

  useEffect(() => {
    if (results.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedResults.length < results.length) {
          const nextPage = page + 1;
          setPage(nextPage);
          setDisplayedResults(results.slice(0, nextPage * 20));
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [results, displayedResults, page]);

  return (
    <div className={classes.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="키워드를 검색해주세요."
        className={classes.searchInput}
      />
      <div className={classes.resultsContainer}>
        {loading && <p className={classes.loadingText}>검색 중입니다...</p>}
        {error && <p className={classes.errorText}>{error}</p>}

        <AnimatePresence>
          {initialMessageVisible && (
            <motion.p
              className={classes.noResultsText}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              검색어를 입력해보세요!
            </motion.p>
          )}
          {!loading && !error && noResultsMessageVisible && (
            <motion.p
              className={classes.noResultsText}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              검색 결과가 존재하지 않습니다.
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
            {!loading && !error && displayedResults.map((result, index) => (
                <motion.div
                    onClick={() => showDetailsInfo(result)}
                    key={result.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={classes.resultItem}
                >
                    <div className={classes.placeName}>{result.type}</div>
                    <div className={classes.regionCode}>{result.subJobType}</div>
                </motion.div>
            ))}
        </AnimatePresence>
        <div ref={observerRef} />
        <KeywordFormModal isOpen={isModal} onClose={closeModal}>
          {selectedItem && (
            <div>
              <h3 className={classes.jobType}>
                    {selectedItem.type} / {selectedItem.jobType}
                </h3>
                <p className={classes.description}>
                    <strong>단위 작업명</strong> <br/> 
                    {selectedItem.subJobType}
                </p>
                <p className={classes.description}>
                    <strong>재해 개요</strong> <br/> 
                    {selectedItem.description}
                </p>
                <p className={classes.reason}><strong>재해 유발 원인</strong> <br/>
                    {selectedItem.reason.trim()}
                </p>
                <p className={classes.reason}><strong>기인물 </strong> <br/>
                    {selectedItem.reasonThing.trim()}
                </p>
                <p className={classes.solution}>
                    <strong>위험성 감소 대책</strong><br />
                    {selectedItem.solution
                        .split("▶")
                        .filter(str => str.trim() !== "")
                        .map((text, idx) => (
                            <span className={classes.solutionDesc} key={idx}>
                            {idx === 0 ? `▶ ${text.trim()}` : <><br />▶ {text.trim()}</>}
                            </span>
                    ))}
                </p>
            </div>
           )}
        </KeywordFormModal>
      </div>
    </div>
  );
};

export default KeywordForm;
