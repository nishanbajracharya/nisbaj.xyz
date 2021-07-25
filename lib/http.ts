import axios, { AxiosRequestConfig } from 'axios';

export function get(url: string, options?: AxiosRequestConfig) {
  return axios.get(url, options);
}
