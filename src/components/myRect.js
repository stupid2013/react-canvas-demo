import React from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';

class MyRect extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: 'green',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.rect.cache();
  }
  handleClick() {
    this.setState(
      {
        color: Konva.Util.getRandomColor(),
      },
      () => {
        // IMPORTANT
        // recache on update
        this.rect.cache();
      },
    );
  }
  render() {
    return (
      <Rect
        filters={[Konva.Filters.Noise]}
        noise={1}
        x={10}
        y={10}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={10}
        ref={(node) => {
          this.rect = node;
        }}
        onClick={this.handleClick}
      />
    );
  }
}

export default MyRect;
