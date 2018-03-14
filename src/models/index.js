
export default {
  namespace: 'canvas',
  state: {
    image: null,
    layerNode: null,
    stageNode: null,
    currentShape: null,
    imageHeight: 0,
    imageNode: null,
    date: '',
    type: '',
    visible: false,
    list: [
      {
        id: 1,
        keyword: '无毒副作用；延缓衰老；专治；抗癌',
        createTime: '2016-09-21 08:50:08',
        url: 'https://www.taobao.com',
        status: '未审查',
        user: '王大雷',
        pic: '',
      },
      {
        id: 2,
        keyword: '无毒副作用；延缓衰老；专治；抗癌',
        createTime: '2016-09-21 08:50:08',
        url: 'https://www.jd.com',
        status: '未审查',
        user: '王大雷',
        pic: '',
      },
      {
        id: 3,
        keyword: '无毒副作用；延缓衰老；专治；抗癌',
        createTime: '2016-09-21 08:50:08',
        url: 'https://www.tmall.com',
        status: '未审查',
        user: '王大雷',
        pic: '',
      },
    ],
    editions: [],
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
