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
  update = (activeAnchor, shap) => {
    const group = activeAnchor.getParent();

    const topLeft = group.get('.topLeft')[0];
    const topRight = group.get('.topRight')[0];
    const bottomRight = group.get('.bottomRight')[0];
    const bottomLeft = group.get('.bottomLeft')[0];
    const arrowLeft = group.get('.arrowLeft')[0];
    const arrowRight = group.get('.arrowRight')[0];
    const shape = group.get(`${shap}`)[0];

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
      case 'arrowLeft':
        arrowLeft.setX(anchorX);
        arrowLeft.setY(anchorY);
        shape.setAttrs({
          points: [anchorX, anchorY, arrowRight.getX(), arrowRight.getY()],
        });
        break;
      case 'arrowRight':
        arrowRight.setX(anchorX);
        arrowRight.setY(anchorY);
        shape.setAttrs({
          points: [arrowLeft.getX(), arrowLeft.getY(), anchorX, anchorY],
        });
        break;
      default:
        break;
    }

    if (shap !== 'Arrow') {
      shape.position(topLeft.position());
    }

    if (shap !== 'Arrow') { // 矩形的时候scale
      const width = topRight.getX() - topLeft.getX();
      const height = bottomLeft.getY() - topLeft.getY();
      if (width && height) {
        shape.width(width);
        shape.height(height);
        if (shap === 'Tag') {
          const text = group.get('Text')[0];
          text.position(topLeft.position());
          text.width(width);
          text.height(height);
        }
      }
    }
  }
  addAnchor = (group, x, y, name, shape) => {
    const layer = group.getLayer();

    const anchor = new Konva.Circle({
      x,
      y,
      stroke: 'transparent',
      fill: 'transparent',
      strokeWidth: 3,
      radius: 6,
      name,
      draggable: true,
      dragOnTop: false,
    });

    anchor.on('dragmove', () => {
      this.update(anchor, shape);
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
      anchor.setAttrs({
        stroke: '#666',
        fill: '#ddd',
      });
      layer1.draw();
    });
    anchor.on('mouseout', () => {
      const layer2 = anchor.getLayer();
      document.body.style.cursor = 'default';
      anchor.setAttrs({
        stroke: 'transparent',
        fill: 'transparent',
      });
      layer2.draw();
    });

    group.add(anchor);
  }
  addRect = () => {
    const { layerNode, stageNode, dispatch } = this.props;
    const rect = new Konva.Rect({
      width: 120,
      height: 50,
      stroke: 'red',
    });

    const rectGroup = new Konva.Group({
      x: 120,
      y: 50,
      // name: `rect${Math.ceil(Math.random() * 200)}`,
      draggable: true,
    });
    layerNode.add(rectGroup);
    rectGroup.add(rect);
    rectGroup.on('mouseover', () => {
      document.body.style.cursor = 'crosshair';
    });

    rectGroup.on('click', (e) => {
      dispatch({
        type: 'canvas/stateWillUpdate',
        payload: {
          currentShape: e.target,
        },
      });
    });

    this.addAnchor(rectGroup, 0, 0, 'topLeft', 'Rect');
    this.addAnchor(rectGroup, 120, 0, 'topRight', 'Rect');
    this.addAnchor(rectGroup, 120, 51, 'bottomRight', 'Rect');
    this.addAnchor(rectGroup, 0, 51, 'bottomLeft', 'Rect');

    stageNode.add(layerNode);
  }
  addArrow = () => {
    const { layerNode, stageNode, dispatch } = this.props;
    const arrow = new Konva.Arrow({
      points: [0, 0, 50, 80],
      pointerLength: 12,
      pointerWidth: 10,
      fill: 'red',
      stroke: 'red',
      strokeWidth: 3,
    });

    const arrowGroup = new Konva.Group({
      x: 20,
      y: 20,
      draggable: true,
    });
    arrowGroup.on('mouseover', () => {
      document.body.style.cursor = 'crosshair';
    });
    layerNode.add(arrowGroup);
    arrowGroup.add(arrow);
    arrowGroup.on('click', (e) => {
      dispatch({
        type: 'canvas/stateWillUpdate',
        payload: {
          currentShape: e.target,
        },
      });
    });
    this.addAnchor(arrowGroup, 0, 0, 'arrowLeft', 'Arrow');
    this.addAnchor(arrowGroup, 55, 88, 'arrowRight', 'Arrow');
    stageNode.add(layerNode);
  }
  addNote = () => {
    const { layerNode, stageNode, dispatch } = this.props;
    const tagNode = new Konva.Tag({
      fill: 'black',
      width: 120,
      height: 50,
      pointerWidth: 10,
      pointerHeight: 10,
      lineJoin: 'round',
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: 10,
      shadowOpacity: 0.5,
      opacity: 0.1,
    });
    const textNote = new Konva.Text({
      text: '双击以修改',
      width: tagNode.width(),
      height: tagNode.height(),
      fontSize: 16,
      lineHeight: 1.2,
      padding: 12,
      fill: 'red',
    });

    const noteGroup = new Konva.Group({
      x: 120,
      y: 50,
      draggable: true,
    });
    layerNode.add(noteGroup);
    noteGroup.add(tagNode);
    noteGroup.add(textNote);
    noteGroup.on('mouseover', () => {
      document.body.style.cursor = 'crosshair';
    });
    noteGroup.on('click', (e) => {
      dispatch({
        type: 'canvas/stateWillUpdate',
        payload: {
          currentShape: e.target,
        },
      });
    });
    this.addAnchor(noteGroup, 0, 0, 'topLeft', 'Tag');
    this.addAnchor(noteGroup, 120, 0, 'topRight', 'Tag');
    this.addAnchor(noteGroup, 120, 51, 'bottomRight', 'Tag');
    this.addAnchor(noteGroup, 0, 51, 'bottomLeft', 'Tag');

    stageNode.add(layerNode);
    textNote.on('dblclick', () => {
      // create textarea over canvas with absolute position
      // first we need to find its positon
      const textPosition = textNote.getAbsolutePosition();
      const stageBox = stageNode.getContainer().getBoundingClientRect();

      const areaPosition = {
        x: textPosition.x + stageBox.left,
        y: textPosition.y + stageBox.top,
      };

      // create textarea and style it
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);

      textarea.value = textNote.text();
      textarea.style.position = 'absolute';
      textarea.style.top = `${areaPosition.y}px`;
      textarea.style.left = `${areaPosition.x}px`;
      textarea.style.width = textNote.width();
      textarea.focus();

      textarea.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          textNote.text(textarea.value);
          layerNode.draw();
          document.body.removeChild(textarea);
        }
      });
    });
  }
  clearLayer = () => {
    const { layerNode } = this.props;
    layerNode.destroyChildren();
    layerNode.draw();
  }
  deleteCurrent = () => {
    const { layerNode, currentShape, dispatch } = this.props;
    currentShape.destroy();
    layerNode.draw();
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        currentShape: null,
      },
    });
  }
  render() {
    const { dispatch, image } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '48px' }}>
        <div style={{ fontSize: '24px', lineHeight: '2', width: '1em', marginRight: '32px' }}>
          <Icon type="file-add" onClick={this.addRect} style={{ cursor: 'pointer' }} />
          <Icon type="arrow-down" onClick={this.addArrow} style={{ cursor: 'pointer' }} />
          <Icon type="edit" onClick={this.addNote} style={{ cursor: 'pointer' }} />
          <Icon type="reload" onClick={this.clearLayer} style={{ cursor: 'pointer' }} />
          <Icon type="delete" onClick={this.deleteCurrent} style={{ cursor: 'pointer' }} />
          <Icon type="download" style={{ cursor: 'pointer' }} />
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
