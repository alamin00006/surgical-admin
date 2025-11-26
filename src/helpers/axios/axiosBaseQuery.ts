import { getBaseUrl } from "../config/envConfig";
import { instance as axiosInstance } from "./axiosInstance";
import { AxiosRequestConfig } from "axios";

interface AxiosBaseQueryArgs {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: any;
  params?: any;
  contentType?: string;
}

interface AxiosBaseQueryOptions {
  baseUrl?: string;
}

export const axiosBaseQuery =
  ({ baseUrl = "" }: AxiosBaseQueryOptions = {}) =>
  async ({ url, method, data, params, contentType }: AxiosBaseQueryArgs) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type": contentType || "application/json",
        },
        withCredentials: true,
      });

      return { data: result.data?.data };
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };
