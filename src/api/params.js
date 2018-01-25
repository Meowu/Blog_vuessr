
import qs from 'querystring'

export default function(config) {
  const METHOD = config.method.toLowerCase()
  const PARAMS = config.body
  if (METHOD === 'get') {
    config.params = PARAMS
    return config
  }

  const CONTENT_TYPE = config.headers['Content-Type']
  const isUrlencode = !CONTENT_TYPE || CONTENT_TYPE.includes('x-www-form-urlendoced')
  isUrlencode && (config.data = qs.stringify(PARAMS))
  !isUrlencode && (config.data = PARAMS)
  return config
};
