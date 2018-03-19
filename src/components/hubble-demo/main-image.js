import React from 'react';
import { Image } from 'react-konva';

/* eslint no-undef: 0 */
class MainImage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const img = new window.Image();
    /* eslint global-require: 0 */
    img.src = require('./../images/test.png');
    // img.src = 'http://konvajs.github.io/assets/darth-vader.jpg';
    img.onload = () => {
      const imageHeight = Math.round((img.height * 960) / img.width);
      dispatch({
        type: 'hubble/stateWillUpdate',
        payload: {
          image: img,
          imageHeight,
        },
      });
    };
  }
  getImageInstance = (node) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hubble/stateWillUpdate',
      payload: {
        imageNode: node,
      },
    });
  }
  render() {
    const { image, imageHeight, imageNode } = this.props;
    return (
      <Image
        image={image}
        draggable
        width={960}
        height={imageHeight}
        onMouseover={() => {
          document.body.style.cursor = 'move';
        }}
        onMouseout={() => {
          document.body.style.cursor = 'default';
        }}
        ref={this.getImageInstance}
        dragBoundFunc={(pos) => {
          return {
            x: imageNode.getAbsolutePosition().x,
            y: pos.y,
          };
        }}
      />
    );
  }
}

export default MainImage;
