import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { setAuthHeader } from "../redux/auth/operations";

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError | null) => void;
};
let failedQueue: FailedRequest[] = [];
let isRefreshing = false;

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// RESPONSE INTERCEPTOR — catch 401 and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log("Interceptor caught an error:", error);
    // console.log("error.config:", error.config);

    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Prevent infinite loop
    if (
      (error.response?.status === 401 || error.response?.status === 400) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (!originalRequest.headers) {
              originalRequest.headers = {};
            }
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const res = await api.post("/auth/refresh", {});
        // console.log("post /refresh and isRefreshing = true", res);
        const newAccessToken = res.data.accessToken;
        // console.log("new accessToken", newAccessToken);
        setAuthHeader(newAccessToken);

        processQueue(null, newAccessToken);
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return api(originalRequest);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          processQueue(err, null);
        } else {
          processQueue(new AxiosError("Unknown error"), null);
        }
        // You might want to logout user here
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
