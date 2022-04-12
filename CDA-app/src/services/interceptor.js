import axios from 'axios';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

export function getRefreshToken(accessToken) {
  return 'refreshed tokens';
}

export function isAccessJWTExpired(accessToken) {
  const isExpired = dayjs(jwtDecode(accessToken).exp * 1000).isBefore(dayjs());
  return isExpired;
}

export const setRequestInterceptor = async (token) => {
  const accessJwt = token.access;
  const refreshToken = token.refresh;

  if (accessJwt) {
    axios.interceptors.request.use(
      (request) => {
        const originalRequest = request;
        const isLoginRequest = (req) =>
          !!(req.url && (req.url === '/token' || req.url === '/token/refresh'));
        if (!isLoginRequest(originalRequest)) {
          if (isAccessJWTExpired(accessJwt)) {
            if (refreshToken) {
              return getRefreshToken(refreshToken)
                .then((res) => {
                  localStorage.setItem('refresh', JSON.stringify(res.data.refresh));
                  localStorage.setItem('access', JSON.stringify(res.data.access));
                  originalRequest.headers.common.Authorization = `Bearer ${res.data.access}`;
                  return Promise.resolve(originalRequest);
                })
                .catch((err) => {
                  return Promise.reject(err);
                });
            }
          }
        }

        return request;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }
};

export default setRequestInterceptor;
