import Request from '../utils/request';

const IndexService = {
  async demo() {
    return Request.get('demo');
  },
};

export default IndexService;
