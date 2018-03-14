import { connect } from 'dva';
import Check from './../components/check';

export default connect((s) => {
  return {
    ...s.canvas,
  };
})(Check);
