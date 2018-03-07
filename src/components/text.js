import React from 'react';
import { Group, Rect, Text } from 'react-konva';

class MyText extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <Group>
        <Rect
          x={20}
          y={60}
          stroke="#555"
          strokeWidth={2}
          width={200}
          height={100}
        />
        <Text
          x={20}
          y={60}
          text="双击以修改"
          width={200}
          height={100}
          padding={20}
          fill="#555"
          fontSize="16"
          draggable
          align="center"
        />
      </Group>
    );
  }
}

export default MyText;
