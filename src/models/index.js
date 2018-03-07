
export default {
  namespace: 'canvas',
  state: {
    image: null,
    showRect: false,
  },
  reducers: {
    stateWillUpdate(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    // *fetch({ payload }, { call, put }) {  // eslint-disable-line
    //   yield put({ type: 'save' });
    // },
  },
  subscriptions: {
    // setup({ dispatch, history }) {  // eslint-disable-line
    // },
  },
};
