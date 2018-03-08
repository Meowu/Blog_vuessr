
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
    let config = Object.assign({}, CONFIG) 
    data.headers && (config.headers = data.headers)
    config.url = data.url
    config.method = data.method
    config.body = data.params
    axios.default.withCredentials = true
    return axios(config)
  }
}

export default new Api();