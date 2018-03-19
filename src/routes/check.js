import { connect } from 'dva';
import Check from './../components/hubble-demo/check';

export default connect((s) => {
  return {
    ...s.hubble,
  };
})(Check);
