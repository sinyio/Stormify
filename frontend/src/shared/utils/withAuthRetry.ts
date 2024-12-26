import { AxiosRequestConfig, AxiosResponse } from "axios";

type RequestFunction<T> = (
  url: string,
  config?: AxiosRequestConfig
) => Promise<AxiosResponse<T>>;

export const withAuthRetry = <T>(
  requestFunction: RequestFunction<T>,
  refreshToken: () => Promise<void>
) => {
  return async (url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await requestFunction(url, config);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshToken();
        const response = await requestFunction(url, config);
        return response.data;
      }
      console.error("Error during request", error);
      throw error;
    }
  };
};
