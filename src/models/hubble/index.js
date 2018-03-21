
export default {
  namespace: 'hubble',
  state: {
    date: new Date(),
    type: '',
    showType: '',
    list: [
      {
        id: 1,
        keyword: '无毒副作用；延缓衰老；专治；抗癌',
        createTime: '2016-09-21 08:50:08',
        url: 'https://www.taobao.com',
        status: '已审查',
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
    editions: [
      {
        id: 1,
        name: '测试广告1',
        category: '生活用品1',
        level: '严重违法',
      },
      {
        id: 2,
        name: '测试广告2',
        category: '生活用品2',
        level: '严重违法',
      },
      {
        id: 3,
        name: '测试广告3',
        category: '生活用品3',
        level: '严重违法',
      },
    ],
    showModal: false,
    showEdition: false,
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
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hubble/show') {
          dispatch({
            type: 'stateWillUpdate',
            payload: {
              showType: 'show',
            },
          });
        }
        if (pathname === '/hubble/check') {
          dispatch({
            type: 'stateWillUpdate',
            payload: {
              showType: 'check',
            },
          });
        }
      });
    },
  },
};
