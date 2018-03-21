
export default {
  namespace: 'canvas',
  state: {
    image: null,
    stageNode: null,
    layerNode: null,
    currentShape: null,
    imageHeight: 0,
    imageNode: null,
    selectedShape: '',
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
  },
  subscriptions: {
  },
};
