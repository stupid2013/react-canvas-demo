import React from 'react';
import { Image } from 'react-konva';

/* eslint no-undef: 0 */
class MainImage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const img = new window.Image();
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
      <Image
        image={image}
        draggable
        onMouseover={() => {
          document.body.style.cursor = 'move';
        }}
        onMouseout={() => {
          document.body.style.cursor = 'default';
        }}
      />
    );
  }
}

export default MainImage;
