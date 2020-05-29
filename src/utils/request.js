import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { getToken, removeToken } from '@/utils/common'

// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 50000, // request timeout
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT', // 避免 IE10 返回 304
        'shouldIntercept': true // 若为 false,则不拦截在自己的请求里处理
    },
    withCredentials: true
})

// request interceptor
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        if (getToken()) {
            // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            config.headers['token'] = getToken()
        }
      
        config.params = {
                _t: Date.parse(new Date()) / 1000,
                ...config.params
            }
            // }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        if (response.request.responseType === 'blob') {
            console.log(response)
            return response
        } else {
            const res = response.data
                // console.log(res)
            if (res.code && res.code !== 0) {
               
                Message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                })
            } 
            return response.data
        }
    },
    err => {
        switch (err.response.status) {
            // 401 token失效
            case 403:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                break;

                // 404 访问的资源不存在
            case 404:
                // router.push('/error/404');
                // break;

                // 500 服务器错误
            case 500:
                Message({
                    showClose: true,
                    message: err.message,
                    type: 'error'
                })
                break;
        }
        console.log('err' + err) // for debug
        return Promise.reject(err)
    }
)

export default service