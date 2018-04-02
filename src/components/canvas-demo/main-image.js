import React from 'react';
import { Image } from 'react-konva';

/* eslint no-undef: 0 */
/* eslint no-unneeded-ternary: 0 */
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
    const { image, imageHeight, imageNode, stageNode } = this.props;
    if (stageNode && imageNode) {
      stageNode.on('mouseover', () => { // 鼠标在画布上时
        imageNode.on('wheel', (e) => { // 滚动图片
          imageNode.move({
            // x: e.evt.deltaX,
            y: e.evt.deltaY,  // 上下滚动
          });
          stageNode.batchDraw();
        });
      });
    }
    return (
      <Image
        image={image}
        name="image"
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
