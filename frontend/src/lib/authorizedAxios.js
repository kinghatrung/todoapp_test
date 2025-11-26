import axios from "axios";
import { toast } from "sonner";
import authService from "~/services/authService";
import { signOut } from "~/redux/features/authSlice";

let axiosReduxStore;

export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore;
};

let authorizedAxiosInstance = axios.create();
authorizedAxiosInstance.defaults.timeout = 1000 * 60;
authorizedAxiosInstance.defaults.withCredentials = true;
authorizedAxiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshTokenPromise = null;

authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.message) {
      toast.success(response.data.message);
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(signOut());
      return Promise.reject(error);
    }

    const originalRequests = error.config;
    if (error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true;
      if (!refreshTokenPromise) {
        refreshTokenPromise = authService
          .refreshToken()
          .then((data) => {
            return data?.accessToken;
          })
          .catch((_error) => {
            axiosReduxStore.dispatch(signOut());
            return Promise.reject(_error);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return refreshTokenPromise.then((accessToken) => {
        return authorizedAxiosInstance(originalRequests);
      });
    }

    if (error.response?.status !== 410 || error.response?.status !== 401) {
      toast.error(error.response?.data?.message);
    }

    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
