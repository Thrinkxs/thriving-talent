// "use"
import axios from "axios";
import useAuthStore from "@/lib/store/auth-store/auth-store";
import Cookies from "js-cookie";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_APP_DEV_URL
    : process.env.NEXT_PUBLIC_APP_PROD_URL;
// const BASE_URL = process.env.NEXT_PUBLIC_APP_PROD_URL
export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

Axios.interceptors.request.use(
  /**
   * just because I am setting the token in the frontend, later in the future I will get rid of this
   * because iOS devices can get the cookies
   */
  (config) => {
    const accessToken = Cookies.get("access-Token"); // Get token from Zustand or cookies

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
Axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log(error);
        // return Axios(originalRequest);
      } catch (err) {
        console.log("an error occured", err);
        useAuthStore.getState().logout();
        window.location.replace("/signin");
      }
    }
    return Promise.reject(error);
  }
);
