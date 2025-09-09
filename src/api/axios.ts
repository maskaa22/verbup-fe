import axios, { AxiosError } from 'axios'
import { setAuthHeader } from '../redux/auth/operations';

type FailedRequest = {
  resolve: (token: string | null) => void
  reject: (error: AxiosError | null) => void
}
let failedQueue: FailedRequest[] = [];
let isRefreshing = false;

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "https://verbup-60d2d030ff70.herokuapp.com/api/v1",
  withCredentials: true
});

// RESPONSE INTERCEPTOR — catch 401 and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Interceptor caught an error:", error?.response?.status);
    const originalRequest = error.config

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token
          return api(originalRequest)
        }).catch(err => Promise.reject(err))
      }

      isRefreshing = true

      try {
        const res = await api.post('/auth/refresh', { 
        })
console.log(res)
        const newAccessToken = res.data.accessToken
        console.log(newAccessToken)
        setAuthHeader(newAccessToken)

        processQueue(null, newAccessToken)

        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken
        return api(originalRequest)
      } catch (err: unknown) {
        
        if(axios.isAxiosError(err)){processQueue(err, null)}
        else{processQueue(new AxiosError("Unknown error"), null)}
        // You might want to logout user here
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api;

