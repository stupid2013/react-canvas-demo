import React from 'react';
import { Image } from 'react-konva';

/* eslint no-undef: 0 */
/* eslint no-unneeded-ternary: 0 */
class MainImage extends React.Component {
  componentDidMount() {
    const { dispatch, from } = this.props;
    const img = new window.Image();
    /* eslint global-require: 0 */
    img.src = require('./../images/test.png');
    // img.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521628535292&di=554fc75c8688143088da239c10e1deca&imgtype=0&src=http%3A%2F%2Fold.bz55.com%2Fuploads%2Fallimg%2F150402%2F139-150402111207.jpg';
    // img.src = 'http://konvajs.github.io/assets/darth-vader.jpg';
    img.onload = () => {
      const imageHeight = Math.round((img.height * 960) / img.width);
      dispatch({
        type: `${from}/stateWillUpdate`,
        payload: {
          image: img,
          imageHeight,
        },
      });
    };
  }
  getImageInstance = (node) => {
    const { dispatch, from } = this.props;
    dispatch({
      type: `${from}/stateWillUpdate`,
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
