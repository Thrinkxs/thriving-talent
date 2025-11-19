// "use"
import { UserRole } from "@/lib/types/user-types/user-types";
import axios from "axios";
import { is } from "date-fns/locale";
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

// Add a response interceptor
Axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async (error) => {
    /**
     * TODO: when users try to sign in we get a 401. But also when the access token has expired.
     * We need to differentiate between these two cases so that we don't try to refresh the access token
     * when the user is actually not signed in.
     * Because right now we get a toast saying no access token found.
     **/

    const originalRequest = error.config;
    // 🚨 Detect backend sign-in/signup endpoints, NOT frontend pages
    const authEndpoints = ["/auth/login", "/auth/register"];

    const isAuthRequest = authEndpoints.some((endpoint) =>
      originalRequest.url.includes(endpoint)
    );

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      originalRequest._retry = true;
      console.log("auth request retrying...", isAuthRequest);

      const userCookieRole = Cookies.get("role");
      let refreshAccessTokenEndpoint = "";
      if (userCookieRole === UserRole.INTERN) {
        refreshAccessTokenEndpoint = "/api/client/intern/auth/access-token";
      } else if (userCookieRole === UserRole.RECRUITER) {
        refreshAccessTokenEndpoint = "/api/client/employer/auth/access-token";
      }

      try {
        // If the access token has expired, refresh it
        const res = await Axios.patch(refreshAccessTokenEndpoint);

        // Update the access token in the Axios headers
        Axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.accessToken;
        // Retry the original request
        return Axios(originalRequest);
      } catch (err) {
        // if it's a recruiter or an intern log them out to their sign pages

        if (userCookieRole === UserRole.RECRUITER) {
          await Axios.delete(`/api/client/employer/auth/logout`);
          window.location.replace("/recruiter/signin");
        } else if (userCookieRole === UserRole.INTERN) {
          await Axios.delete("/api/client/intern/auth/logout/");
          window.location.replace("/user/signin");
        }

        console.log("an error occured", err);
      }
    }
    return Promise.reject(error);
  }
);
