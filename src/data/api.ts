import axios, { AxiosInstance } from 'axios';

const api_url =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8000/api/'
    : 'http://localhost:8000/api/';

export default function api(): AxiosInstance {
  const api_token = localStorage.getItem('token');
  let axiosInstance = axios.create({
    baseURL: api_url,
    //Use abaixo a instancia do Token
    headers: api_token
      ? {
          authorization: `Token ${api_token}`,
        }
      : {},
  });

  axiosInstance.interceptors.response.use(
    function (res) {
      // Do something with res data
      if (res.headers?.newtoken) {
        localStorage.removeItem('token');
        localStorage.setItem('token', res.headers.newtoken);
      }
      return res;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
