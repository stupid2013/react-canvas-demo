import React from 'react';
import { Stage, Layer } from 'react-konva';
import MainImage from './main-image';

const Index = ({
  dispatch,
  image,
}) => {
  return (
    <Stage width={800} height={600}>
      <Layer>
        <MainImage
          dispatch={dispatch}
          image={image}
        />
      </Layer>
    </Stage>
  );
};
export default Index;
