import axios from "axios";
import qs from "querystring"
import router from "../router";
import store from "../store"

const toLogin = () => {
    router.push("/login")
}

const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log("400")
            toLogin();
            break;
        case 401:
            console.log("401")
            toLogin();
            break;
        case 403:
            console.log("403")
            toLogin();
            break;
        case 404:
            console.log("404")
            break;
        case 500:
            console.log("500")
            break;
        case 503:
            console.log("503")
            break;
        default:
            console.log(info);
            break;
    }
}

const instance = axios.create({
    timeout: 5000
})

instance.all = axios.all
instance.spread = axios.spread
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

instance.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            config.data = qs.stringify(config.data)
        }
        //判断token是否存在，存在就添加到请求头上
        // const token=store.state.loginModule.user.token
        // if(token){
        //     config.headers.authorization=token
        // }
        return config
    },
    error => Promise.reject(error)
)

instance.interceptors.response.use(
    response => {
        response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
        //返回data
        return response.data
    },
    error => {
        const { response } = error
        if (response) {
            errorHandle(response.status, response.info)
        } else {
            console.log("请求中断了")
        }
        //重要！！！返回data
        return error.response.data
    }
)

export function get(url, params) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export function post(url, params, headers) {
    return new Promise((resolve, reject) => {
        instance.post(url, qs.stringify(params), headers)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export default instance




