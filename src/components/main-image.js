import React from 'react';
import { Image } from 'react-konva';

class MainImage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const img = new window.Image(); // eslint-disable-line no-undef
    /* eslint global-require: 0 */
    img.src = require('./test.png');
    // img.src = 'http://konvajs.github.io/assets/darth-vader.jpg';
    img.onload = () => {
      dispatch({
        type: 'canvas/stateWillUpdate',
        payload: {
          image: img,
        },
      });
    };
  }
  render() {
    const { image } = this.props;
    return (
      <Image image={image} />
    );
  }
}

export default MainImage;
