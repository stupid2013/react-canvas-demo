import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

const Index = ({
  dispatch,
  color,
}) => {
  const handleClick = () => dispatch({
    type: 'canvas/stateWillUpdate',
    payload: {
      color: Konva.Util.getRandomColor(),
    },
  });
  return (
    <Stage width={200} height={200}>
      <Layer>
        <Text text="Try click on rect" />
        <Rect
          x={20}
          y={20}
          width={50}
          height={50}
          fill={color}
          shadowBlur={5}
          onClick={handleClick}
        />
      </Layer>
    </Stage>
  );
};

export default Index;
