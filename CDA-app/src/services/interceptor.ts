import axios, { AxiosRequestConfig } from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs';
import { refreshTokens } from 'api/auth';

function isAccessJWTExpired(accessToken: string | null) {
  if (accessToken) {
    const decodeExpires = jwtDecode<JwtPayload>(accessToken).exp;
    if (decodeExpires) return dayjs(decodeExpires * 1000).isBefore(dayjs());
  }
}

const isLoginRequest = (req: AxiosRequestConfig<unknown>) => {
  return req.url?.includes('/token') || req.url?.includes('/token/refresh');
};

export default function setRequestInterceptor() {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access')}`;
  axios.interceptors.request.use(
    async (request) => {
      const refreshToken = localStorage.getItem('refresh');
      const accessToken = localStorage.getItem('access');

      if (isLoginRequest(request) || !isAccessJWTExpired(accessToken)) {
        return request;
      }

      try {
        const res = await refreshTokens(refreshToken);
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.access}`;
        if (request.headers) request.headers.Authorization = `Bearer ${res.data.access}`;
        localStorage.setItem('refresh', res.data.refresh);
        localStorage.setItem('access', res.data.access);
        return request;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    function (error) {
      return Promise.reject(error);
    },
  );
}
