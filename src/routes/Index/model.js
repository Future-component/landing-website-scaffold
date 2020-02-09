import modelExtend from 'dva-model-extend'
import { model } from '@/utils/model'

export default modelExtend(
  model,
  {
    namespace: 'home',
    state: {
    },
    subscriptions: {
      // 获取用户数据信息的时机就是访问 /users/这个页面，我们需要监听路由信息，只要路径是 /users/ 那么我们就会发起action
      // setup({ dispatch, history }) {
      //   history.listen((location) => {
      //     console.log(location, history)
      //     // 请求获取权限的接口
      //   })
      // },
      tryUnsubscribe({ dispatch, history }) {
        history.listen(() => {
          // dispatch({ type: 'close' })
        })
      },
    },
  },
)
