// import React from 'react';
// import { Group, Rect, Text } from 'react-konva';
//
// /* eslint no-undef: 0 */
// class MyText extends React.Component {
//   componentDidMount() {
//     const { dispatch } = this.props;
//     console.log('======= Text height ', this.refs.text);
//     dispatch({
//       type: 'canvas/stateWillUpdate',
//       payload: {
//         textHeight: this.refs.text.attrs.height,
//       },
//     });
//   }
//   render() {
//     const { textHeight } = this.props;
//     console.log('---- textHeight ', textHeight);
//     return (
//       <Group
//         draggable
//         onMouseover={() => {
//           document.body.style.cursor = 'move';
//         }}
//       >
//         <Rect
//           x={20}
//           y={60}
//           stroke="red"
//           strokeWidth={2}
//           width={200}
//           height={textHeight}
//         />
//         <Text
//           ref="text"
//           x={20}
//           y={60}
//           text="双击以修改"
//           width={200}
//           height={60}
//           padding={20}
//           fill="red"
//           fontSize="16"
//           align="center"
//         />
//       </Group>
//     );
//   }
// }
//
// export default MyText;
