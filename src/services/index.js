import callApi from '@/utils/api'
import api from './api'
import { queryString } from '@/utils/index'

const commonApi = ''
const admin = {
  token: queryString().token,
  ms: 0,
}
const commonParams = Object.assign(admin)

const gen = params => {
  let url = params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = paramsArray[1]
  }

  return data => {
    const config = {
      url: url.indexOf('//') > -1 ? url : `${commonApi}${url}`,
      method,
      data: method === 'GET' ? {} : data,
      params: method === 'GET' ? Object.assign({}, data, commonParams) : commonParams,
    }
    if (method === 'GET') {
      delete config.data
    }
    return callApi(config)
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

// 额外 API 配置
APIFunction.postUpload = data => callApi({
  url: `${commonApi}/common/upload?token=${queryString().token}&ms=0`,
  method: 'POST',
  data,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
export default APIFunction
