import React from 'react';
import { Label } from 'react-konva';
import Konva from 'konva';

/* eslint no-undef: 0 */
class Note extends React.Component {
  componentDidMount() {
  }
  handleLable = (content) => {
    if (content) {
      content.add(new Konva.Tag({
        fill: 'black',
        pointerWidth: 10,
        pointerHeight: 10,
        lineJoin: 'round',
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: 10,
        shadowOpacity: 0.5,
        opacity: 0.1,
      }));
      content.add(new Konva.Text({
        text: '双击以修改',
        fontSize: 16,
        lineHeight: 1.2,
        padding: 10,
        fill: 'red',
      }));
    }
  }
  render() {
    return (
      <Label
        id="canvas"
        ref={this.handleLable}
        x={60}
        y={100}
        draggable
        onMouseover={() => {
          document.body.style.cursor = 'move';
        }}
      />
    );
  }
}

export default Note;
