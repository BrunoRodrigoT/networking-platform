import axios from "axios";
import { API_URL } from "./common";

const Instance = axios.create({
  baseURL: API_URL,
  paramsSerializer: (params) => {
    const cleanedParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (!value && typeof value != "boolean") {
        delete params[key];
      } else {
        if (Array.isArray(value)) {
          for (const item of value) {
            cleanedParams.append(key, item as unknown as string);
          }
        } else {
          cleanedParams.append(key, value as unknown as string);
        }
      }
    }
    return cleanedParams as any;
  },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
Instance.interceptors.request.use(
  (req) => {
    return Promise.resolve(req);
  },

  (err) => {
    return Promise.reject(err);
  }
);
Instance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    const error =
      typeof err?.response?.data === "object"
        ? err?.response?.data
        : {
          status: 500,
          message: "Houve um problema ao contatar o servidor.",
        };
    return Promise.reject(error);
  }
);

export default Instance;
