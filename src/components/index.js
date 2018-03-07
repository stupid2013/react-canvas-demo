import React from 'react';
import { Icon, Button } from 'antd';
import { Stage, Layer } from 'react-konva';
import MainImage from './main-image';

const Index = ({
  dispatch,
  image,
}) => {
  return (
    <div>
      <div style={{ width: '100px', height: '100px', background: 'pink', color: 'white' }}>
        <Icon type="delete" />123
        <Button icon="delete" type="primary">this is a button</Button>
      </div>
      <Stage width={800} height={600}>
        <Layer>
          <MainImage
            dispatch={dispatch}
            image={image}
          />
        </Layer>
      </Stage>
    </div>
  );
};
export default Index;
