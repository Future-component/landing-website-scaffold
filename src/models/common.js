import apis from '@/services'
import concat from 'lodash/concat'

const { getUserInfo, postUpload } = apis
export default {
  namespace: 'common',
  state: {
    userInfo: {},
    permissions: null,
  },
  subscriptions: {
    // 获取用户数据信息的时机就是访问 /users/这个页面，我们需要监听路由信息，只要路径是 /users/ 那么我们就会发起action
    setup({ dispatch, history }) {
      history.listen((location) => {
        // console.log(location, history)
        // 请求获取权限的接口
        // dispatch({ type: 'getUserInfo' })
      })
    },
    tryUnsubscribe({ dispatch, history }) {
      history.listen(() => {
        // dispatch({ type: 'close' })
      })
    },
  },
  effects: {
    *postUpload({ payload }, { call }) {
      const response = yield call(postUpload, payload)
      if (response) {
        console.log('上传成功', response)
      }
    },
    *getUserInfo({ payload }, { call, put }) {
      const { response } = yield call(getUserInfo, payload)
      if (response) {
        const permissions = response.staff.roles.map(item => (item && item.permissionOperation ? item.permissionOperation : []))
        yield put({ type: 'updateUserInfo', payload: {
          userInfo: {
            id: response.staff.id,
            name: response.staff.name,
          },
          permissions: concat(...permissions),
        } })
      }
    },
  },
  reducers: {
    updateUserInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },
}
