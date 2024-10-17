import axios from 'axios';
import { API_ROOT } from '../constants/constants';
import { getLocalAccessToken, getLocalRefreshToken, updateLocalAccessToken } from '../services/tokenService';
import { Alert } from '../components/alert/Alert';

const apiUrl = API_ROOT;

// Khởi tạo instance của axios
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token to headers if present
    const token = getLocalAccessToken(); // Get token from localStorage or context
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    // Error handling in request
    return Promise.reject(error);
  }
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
      // Successful processing
      return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (originalConfig.url !== "/api/v1/auth/signin" && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const refreshToken = getLocalRefreshToken();
          const rs = await axiosInstance.post("/api/v1/auth/refreshtoken", { refreshToken });

          const { accessToken } = rs.data;
          updateLocalAccessToken(accessToken);

          return axiosInstance(originalConfig);
        } catch (_error) {
            return Promise.reject(_error);
        }
      }
      if (error.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;
        Alert(3000, "Thông báo", "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại", "warning", "OK");
        // return window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
