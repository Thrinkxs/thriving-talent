// "use"
import axios from "axios";
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
        // If the access token has expired, refresh it
        const res = await Axios.patch("/api/client/employer/auth/access-token");

        console.log("the response from axios when token expired", res);
        // Update the access token in the Axios headers
        Axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.accessToken;
        // Retry the original request
        return Axios(originalRequest);
      } catch (err) {
        // Handle the error (e.g., redirect to login page)
        // Make a request to the /logout endpoint
        await Axios.delete(`/api/client/employer/auth/logout`);

        console.log("an error occured", err);
        window.location.replace("/user/signin");
      }
    }
    return Promise.reject(error);
  }
);
