import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // 如果 token 存在，在每个 HTTP header 都加上 token
      // Bearer 是 JWT 的认证头部信息
      config.headers.setAuthorization(`Bearer ${token}`);
    //   config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  });
  
axios.interceptors.response.use(
    reponse=>{
        return reponse
    },
    err=>{
        return Promise.reject(err)
    }
)

export class Http{
    static Http({url,method='post',data={},params={}}){
        return axios({
            url,
            method,
            data,
            params
        })
    }
}