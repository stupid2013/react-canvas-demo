import React from 'react';
import { Icon } from 'antd';
import { Stage, Layer } from 'react-konva';
// import Konva from 'konva';
import MainImage from './main-image';
import Rectangle from './rectangle';
import Note from './note';

/* eslint global-require: 0 */
const Index = ({
  dispatch,
  image,
  showRect,
}) => {
  const addRect = () => dispatch({
    type: 'canvas/stateWillUpdate',
    payload: {
      showRect: true,
    },
  });
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '48px' }}>
      <div style={{ fontSize: '24px', lineHeight: '2', width: '1em', marginRight: '32px' }}>
        <Icon type="file-add" onClick={addRect} style={{ cursor: 'pointer' }} />
        <Icon type="arrow-down" style={{ cursor: 'pointer' }} />
        <Icon type="edit" style={{ cursor: 'pointer' }} />
        <Icon type="reload" style={{ cursor: 'pointer' }} />
        <Icon type="delete" style={{ cursor: 'pointer' }} />
      </div>
      <div style={{ border: '1px solid #eee' }}>
        <Stage width={800} height={600} style={{ background: `url(${require('./tb.png')})` }}>
          <Layer>
            <MainImage
              dispatch={dispatch}
              image={image}
            />
            {showRect &&
              <Rectangle />
            }
            <Note />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
export default Index;
