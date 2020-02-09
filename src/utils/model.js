import apis from '@/services'
import isFunction from 'lodash/isFunction'

export const model = {
  state: {
  },
  effects: {
    *fetchApi({ payload, callback }, { call, put }) {
      const { response } = yield call(apis[payload.api], payload.params)
      if (response) {
        yield put({
          type: 'updateState',
          payload: {
            [payload.key || payload.api]: response,
          },
        })
        if (isFunction(callback)) {
          callback(response)
        }
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
