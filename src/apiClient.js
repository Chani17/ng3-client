import axios from 'axios';
import { router } from './router';

const apiClient = axios.create({
  baseURL: 'http://nggg.com:8080/api', // API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰을 헤더에 추가
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 오류 처리
apiClient.interceptors.response.use(
  (response) => response, // 정상적인 응답은 그대로 반환
  (error) => {
    const isLoginRequest =
      error.config.url.includes('/login') ||
      error.config.url.includes('/oauth2');

    if (error.response && error.response.status === 401 && !isLoginRequest) {
      localStorage.removeItem('token'); // 토큰을 로컬 스토리지에서 제거
      router.push('/login'); // 로그인 페이지로 리디렉트
    }
    return Promise.reject(error); // 오류를 그대로 반환하여 필요 시 추가 처리
  }
);

export default apiClient;
