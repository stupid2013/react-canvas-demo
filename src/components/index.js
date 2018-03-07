import React from 'react';
import { Icon } from 'antd';
import { Stage, Layer } from 'react-konva';
import MainImage from './main-image';

const Index = ({
  dispatch,
  image,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '48px' }}>
      <div style={{ fontSize: '24px', lineHeight: '2', width: '1em', marginRight: '32px' }}>
        <Icon type="plus-circle-o" />
        <Icon type="minus-circle-o" />
        <Icon type="file-add" />
        <Icon type="edit" />
        <Icon type="reload" />
      </div>
      <div style={{ border: '1px solid #eee' }}>
        <Stage width={800} height={600}>
          <Layer>
            <MainImage
              dispatch={dispatch}
              image={image}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
export default Index;
