import { connect } from 'dva';
import Canvas from './../components/canvas-demo';

export default connect((s) => {
  return {
    ...s.canvas,
  };
})(Canvas);
