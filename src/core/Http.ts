import axios from "axios";
import { API_TIMEOUT, BASE_URL } from "./Constants";
import { Storage } from "./Storage";

interface IRequest {
  url: string;
  data?: any;
  params?: any;
}

export const apiInstance = axios.create({
  timeout: API_TIMEOUT,
  baseURL: BASE_URL,
});

apiInstance.interceptors.request.use(async (config) => {
  const raw = Storage.get();
  if (raw) {
    const token = JSON.parse(raw).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const get = <T = any>({ url, params }: IRequest) => {
  const paramToSend = {};
  if (params) {
    Object.keys(params).forEach((item) => {
      if (params[item]) {
        Object.assign(paramToSend, {
          [item]: params[item],
        });
      }
    });
  }
  return apiInstance.get<T>(url, {
    params: { ...paramToSend },
  });
};

const post = <T = any>({ url, data }: IRequest) => {
  return apiInstance.post<T>(url, data);
};

const Http = {
  get,
  post,
};

export default Http;
