
import CONFIG from './config'
import axios from 'axios'
import intercept from './params'

axios.interceptors.request.use((config) => intercept(config))

class Api {
  get(data) {
    data.method ='get'
    return this.request(data)
  }

  put(data) {
    data.method = 'put'
    return this.request(data)
  }

  post(data) {
    data.method = 'post'
    return this.request(data)
  }

  delete (data) {
    data.method = 'delete'
    return this.request(data)
  }

  request(data) {
    let config = Object.assign({}, CONFIG) // 这里不能用const，
    const ACCESS_TOKEN = '872a5148-c8dd-4afa-8100-137c29df2f55'
    data.header && (config.headers = data.header)
    data.accesstoken && (data.params.accesstoken = ACCESS_TOKEN)
    config.url = data.url
    config.method = data.method
    config.body = data.params
    axios.default.withCredentials = true
    return axios(config)
  }
}

export default new Api();