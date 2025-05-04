import axios from "axios";
import { toast } from "react-toastify";
import { reIssueTokenService } from "./AuthService";

const apiClient = axios.create({
  baseURL: window.location.hostname === 'localhost' 
  ? 'http://localhost:8080/danger' 
  : `${import.meta.env.VITE_BACKEND_URL}/danger`,
    withCredentials: true,
})

apiClient.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);
  
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.headers['token-error-message']) {
      const tokenErrorMessage = error.response.headers['token-error-message'];
      if (tokenErrorMessage === 'Token Expired') {
        const refreshToken = localStorage.getItem('refreshToken');
        const reissueTokenResponseData = await reIssueTokenService({ refreshToken });

        if (reissueTokenResponseData.success){
            const newAccessToken = reissueTokenResponseData.data.accessToken;
            const newRefreshToken = reissueTokenResponseData.data.refreshToken;
            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(error.config);

        }else{
            toast.warning("로그인 시간이 만료되었습니다. \n 다시 로그인해주세요.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken"); 
            setTimeout(() => {
                window.location.href = '/auth';
            },2000)
        }
      } else {
        toast.error("인증에 문제가 생겼습니다. \n 다시 로그인해주세요.", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken"); 
        setTimeout(() => {
            window.location.href = '/auth';
        },2000)
      }
    }
    return Promise.reject(error);
  }
);

export const getAllDangerousFactorService = async () => {
    try{
      const dangerousFactorResponse = await apiClient.get('/all');
      return await dangerousFactorResponse.data;
    }catch(error){
        if (error.response){
            return error.response.data;
        }
        toast.error(`일시적 네트워크 오류입니다.\n 잠시 후 다시 시도해주세요.`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return { success : false }
    }
};

export const getDangerousFactorByKeywordService = async (keyword) => {
  
  try{
    const dangerousFactorResponse = await apiClient.get(`/search/${keyword}`);
    return await dangerousFactorResponse.data;
  }catch(error){
      if (error.response){
          return error.response.data;
      }
      toast.error(`일시적 네트워크 오류입니다.\n 잠시 후 다시 시도해주세요.`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      return { success : false }
  }
};

export const getTypesService = async () => {
  
  try{
    const typesResponse = await apiClient.get(`/type`);
    return await typesResponse.data;
  }catch(error){
      if (error.response){
          return error.response.data;
      }
      toast.error(`일시적 네트워크 오류입니다.\n 잠시 후 다시 시도해주세요.`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      return { success : false }
  }
};

export const getJobTypesByTypeService = async (type) => {
  
  try{
    const typesResponse = await apiClient.get(`/jobType/${type}`);
    return await typesResponse.data;
  }catch(error){
      if (error.response){
          return error.response.data;
      }
      toast.error(`일시적 네트워크 오류입니다.\n 잠시 후 다시 시도해주세요.`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      return { success : false }
  }
};
export const getSubJobTypesByJobTypeService = async (jobType) => {
  
  try{
    const typesResponse = await apiClient.get(`/subJobType/${jobType}`);
    return await typesResponse.data;
  }catch(error){
      if (error.response){
          return error.response.data;
      }
      toast.error(`일시적 네트워크 오류입니다.\n 잠시 후 다시 시도해주세요.`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      return { success : false }
  }
};export const getDangerSituationByFilterService = async (filterForm) => {
  
  try{
    const filterResponse = await apiClient.post(`/filter`, filterForm);
    return await filterResponse.data;
  }catch(error){
      if (error.response){
          return error.response.data;
      }
      toast.error(`일시적 네트워크 오류입니다.\n 잠시 후 다시 시도해주세요.`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      return { success : false }
  }
};