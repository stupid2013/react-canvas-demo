import React from 'react';
import { Rect } from 'react-konva';

class Rectangle extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <Rect
        x={20}
        y={20}
        stroke="red"
        width={120}
        height={50}
        draggable
      />
    );
  }
}

export default Rectangle;
