import axios, { AxiosRequestConfig } from 'axios';

export function get(url: string, options?: AxiosRequestConfig) {
  return axios.get(url, options);
}

export function post(url: string, data: any, options?: AxiosRequestConfig) {
  return axios.post(url, data, options);
}
