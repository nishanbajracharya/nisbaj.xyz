import axios, { AxiosRequestConfig } from 'axios';

export function get(url: string, options?: AxiosRequestConfig) {
  return axios.get(url, options);
}

export function post(url: string, data: any, options?: AxiosRequestConfig) {
  return axios.post(url, data, options);
}

export function put(url: string, data: any, options?: AxiosRequestConfig) {
  return axios.put(url, data, options);
}

export function remove(url: string,  options?: AxiosRequestConfig) {
  return axios.delete(url, options);
}

const http = {
  get,
  post,
  put,
  delete: remove
};

export default http;
