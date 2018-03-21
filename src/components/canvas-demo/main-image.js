import React from 'react';
import { Image } from 'react-konva';

/* eslint no-undef: 0 */
/* eslint no-unneeded-ternary: 0 */
class MainImage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const img = new window.Image();
    /* eslint global-require: 0 */
    img.src = 'http://dwz.cn/7DXlfC';
    // img.src = 'http://konvajs.github.io/assets/darth-vader.jpg';
    img.onload = () => {
      const imageHeight = Math.round((img.height * 960) / img.width);
      dispatch({
        type: 'canvas/stateWillUpdate',
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
      type: 'canvas/stateWillUpdate',
      payload: {
        imageNode: node,
      },
    });
  }
  render() {
    const { image, imageHeight, imageNode, selectedShape } = this.props;
    return (
      <Image
        image={image}
        name="image"
        draggable={(selectedShape === 'add-rect' || selectedShape === 'add-arrow' || selectedShape === 'add-note') ? false : true}
        width={960}
        height={imageHeight}
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
