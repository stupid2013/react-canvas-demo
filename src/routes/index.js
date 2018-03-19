import { connect } from 'dva';
import Index from './../components/hubble-demo/index';

export default connect((s) => {
  return {
    ...s.hubble,
  };
})(Index);
