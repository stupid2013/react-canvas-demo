import React from 'react';
import { Stage, Layer } from 'react-konva';
import MainImage from './main-image';
import Rectangle from './rectangle';
import Note from './note';
import Operations from './operations';
// import MyRect from './myRect';
// import Text from './text';

/* eslint global-require: 0 */
class Index extends React.Component {
  componentDidMount() {
  }
  render() {
    const { dispatch, image } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '48px' }}>
        <Operations />
        <div style={{ border: '1px solid #eee' }}>
          <Stage
            width={800}
            height={600}
            style={{ background: `url(${require('./images/tb.png')})` }}
          >
            <Layer name="image">
              <MainImage
                dispatch={dispatch}
                image={image}
              />
            </Layer>
            <Layer name="shapes">
              <Rectangle />
              <Note />
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

export default Index;
