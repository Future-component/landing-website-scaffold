import axios from 'axios'
import common from '@/plugins/common'

axios.defaults.withCredentials = true;
// 区分CODE,有些报错,有些用户看不见报错
function checkStatus(response) {
  let errMsg
  if (response.status >= 200 && response.status < 300) {
    if (response.data.code === 0) {
      return response.data
    }
    errMsg = response.data.msg
  } else {
    errMsg = response.statusText
  }

  const error = new Error(errMsg)
  error.response = response
  error.msg = errMsg
  throw error
}

export default function callApi(config, msg) {
  // console.log('api-config', config)

  return axios(config)
    .then(response => checkStatus(response))
    .then(response => ({ response: response.data || true }))
    .catch((err) => {
      console.log('接口报错', err)
      let msgTmp = msg
      const data = err.response.data
      if (err.response) {
        common.onError({ message: err.response.data.msg, data })
      } else {
        msgTmp = err.message || err.msg
      }
      return { error: msgTmp }
    })
}
