import React from 'react';
import { Rect } from 'react-konva';

/* eslint no-undef: 0 */
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
        lineJoin="round"
        draggable
        onMouseover={() => {
          document.body.style.cursor = 'move';
        }}
      />
    );
  }
}

export default Rectangle;
