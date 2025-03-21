import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000
})

// 请求拦截
service.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = config.headers || {}
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截
service.interceptors.response.use(
  response => response.data,
  error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

export default service
