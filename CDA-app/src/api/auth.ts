import axios from 'axios';

export const refreshTokens = async (refreshToken: string | null) => {
  return axios.post('/token/refresh', {
    refresh: refreshToken,
  });
};
