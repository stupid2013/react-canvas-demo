import React from 'react';
import Konva from 'konva';
import { Icon } from 'antd';
import { Stage, Layer } from 'react-konva';
import MainImage from './main-image';
// import Rectangle from './rectangle';
// import Note from './note';
// import MyRect from './myRect';
// import Text from './text';

/* eslint no-undef: 0 */
/* eslint global-require: 0 */
class Index extends React.Component {
  componentDidMount() {
  }
  getStageInstance = (node) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        stageNode: node.getStage(),
      },
    });
  }
  getLayerInstance = (node) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        layerNode: node,
      },
    });
  }
  update = (activeAnchor) => {
    const group = activeAnchor.getParent();

    const topLeft = group.get('.topLeft')[0];
    const topRight = group.get('.topRight')[0];
    const bottomRight = group.get('.bottomRight')[0];
    const bottomLeft = group.get('.bottomLeft')[0];
    const rect = group.get('Rect')[0];

    const anchorX = activeAnchor.getX();
    const anchorY = activeAnchor.getY();

    // update anchor positions
    switch (activeAnchor.getName()) {
      case 'topLeft':
        topRight.setY(anchorY);
        bottomLeft.setX(anchorX);
        break;
      case 'topRight':
        topLeft.setY(anchorY);
        bottomRight.setX(anchorX);
        break;
      case 'bottomRight':
        bottomLeft.setY(anchorY);
        topRight.setX(anchorX);
        break;
      case 'bottomLeft':
        bottomRight.setY(anchorY);
        topLeft.setX(anchorX);
        break;
      default:
        break;
    }

    rect.position(topLeft.position());

    const width = topRight.getX() - topLeft.getX();
    const height = bottomLeft.getY() - topLeft.getY();
    if (width && height) {
      rect.width(width);
      rect.height(height);
    }
  }
  addAnchor = (group, x, y, name) => {
    const layer = group.getLayer();

    const anchor = new Konva.Circle({
      x,
      y,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 1,
      radius: 5,
      name,
      draggable: true,
      dragOnTop: false,
    });

    anchor.on('dragmove', () => {
      this.update(anchor);
      layer.draw();
    });
    anchor.on('mousedown touchstart', () => {
      group.setDraggable(false);
      anchor.moveToTop();
    });
    anchor.on('dragend', () => {
      group.setDraggable(true);
      layer.draw();
    });
    // add hover styling
    anchor.on('mouseover', () => {
      const layer1 = anchor.getLayer();
      document.body.style.cursor = 'pointer';
      anchor.setStrokeWidth(3);
      layer1.draw();
    });
    anchor.on('mouseout', () => {
      const layer2 = anchor.getLayer();
      document.body.style.cursor = 'default';
      anchor.setStrokeWidth(2);
      layer2.draw();
    });

    group.add(anchor);
  }
  addRect = () => {
    const { layerNode, stageNode } = this.props;
    const rect = new Konva.Rect({
      x: 50,
      y: 50,
      width: 120,
      height: 66,
      stroke: 'red',
      draggable: true,
      cornerRadius: 6,
      scaleX: 5,
      scaleY: 3,
    });

    rect.on('mouseover', () => {
      document.body.style.cursor = 'move';
    });

    layerNode.add(rect);
    stageNode.add(layerNode);
  }
  addArrow = () => {
    const { layerNode, stageNode } = this.props;
    const arrow = new Konva.Arrow({
      x: stageNode.getWidth() / 4,
      y: stageNode.getHeight() / 4,
      points: [0, 0, 30, 40],
      pointerLength: 12,
      pointerWidth: 12,
      fill: 'red',
      stroke: 'red',
      draggable: true,
      strokeWidth: 2,
    });

    arrow.on('mouseover', () => {
      document.body.style.cursor = 'move';
    });

    layerNode.add(arrow);
    stageNode.add(layerNode);
  }
  addNote = () => {
    const { layerNode, stageNode } = this.props;
    const text = new Konva.Text({
      x: 20,
      y: 60,
      text: '双击以修改',
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: 'red',
      width: 300,
      padding: 20,
      align: 'center',
      draggable: true,
    });
    layerNode.add(text);
    stageNode.add(layerNode);
  }
  testScale = () => {
    const { layerNode, stageNode } = this.props;
    const rect = new Konva.Rect({
      width: 200,
      height: 137,
      stroke: 'red',
    });

    rect.on('mouseover', () => {
      document.body.style.cursor = 'move';
    });

    const rectGroup = new Konva.Group({
      x: 120,
      y: 50,
      draggable: true,
    });
    layerNode.add(rectGroup);
    rectGroup.add(rect);
    this.addAnchor(rectGroup, 0, 0, 'topLeft');
    this.addAnchor(rectGroup, 200, 0, 'topRight');
    this.addAnchor(rectGroup, 200, 138, 'bottomRight');
    this.addAnchor(rectGroup, 0, 138, 'bottomLeft');

    stageNode.add(layerNode);
  }
  render() {
    const { dispatch, image } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '48px' }}>
        <div style={{ fontSize: '24px', lineHeight: '2', width: '1em', marginRight: '32px' }}>
          <Icon type="file-add" onClick={this.addRect} style={{ cursor: 'pointer' }} />
          <Icon type="arrow-down" onClick={this.addArrow} style={{ cursor: 'pointer' }} />
          <Icon type="edit" onClick={this.addNote} style={{ cursor: 'pointer' }} />
          <Icon type="reload" onClick={this.testScale} style={{ cursor: 'pointer' }} />
          <Icon type="delete" style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ border: '1px solid #eee' }}>
          <Stage
            ref={this.getStageInstance}
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
            <Layer ref={this.getLayerInstance} name="shapes" />
          </Stage>
        </div>
      </div>
    );
  }
}

export default Index;
