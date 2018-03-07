import { connect } from 'dva';
import Index from './../components/index';

export default connect((s) => {
  return {
    ...s.canvas,
  };
})(Index);
