
const DEFAULT_X_HEADER = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
}

const DEFAULT_JSON_HEADER = {
  'Content-Type': 'application/json'
}

const BASE_URL = 'http://joi.im/api/v1'
// const BASE_URL = 'http://127.0.0.1:3000/api/v1'

export default {
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    // ...DEFAULT_X_HEADER,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
  }
}

export const APPLICATION_JSON = DEFAULT_JSON_HEADER