import React from 'react';
import Konva from 'konva';
import { Icon, Popconfirm } from 'antd';
import { Stage, Layer } from 'react-konva';
import styles from './index.css';
import MainImage from './main-image';

/* eslint no-undef: 0 */
/* eslint global-require: 0 */
class MyCanvas extends React.Component {
  getStageInstance = (node) => {
    const { dispatch } = this.props;
    if (node) {
      dispatch({
        type: 'canvas/stateWillUpdate',
        payload: {
          stageNode: node.getStage(),
        },
      });
    }
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
    const { dispatch } = this.props;

    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        selectedShape: 'add-rect',
      },
    });

    // const rect = new Konva.Rect({
    //   width: 120,
    //   height: 50,
    //   stroke: 'red',
    // });
    //
    // const rectGroup = new Konva.Group({
    //   x: 120,
    //   y: 50,
    //   draggable: true,
    // });
    // layerNode.add(rectGroup);
    // rectGroup.add(rect);
    // rectGroup.on('mouseover', () => {
    //   document.body.style.cursor = 'crosshair';
    // });
    //
    // rectGroup.on('click', (e) => {
    //   dispatch({
    //     type: 'canvas/stateWillUpdate',
    //     payload: {
    //       currentShape: e.target,
    //     },
    //   });
    // });
    //
    // this.addAnchor(rectGroup, 0, 0, 'topLeft', 'Rect');
    // this.addAnchor(rectGroup, 120, 0, 'topRight', 'Rect');
    // this.addAnchor(rectGroup, 120, 51, 'bottomRight', 'Rect');
    // this.addAnchor(rectGroup, 0, 51, 'bottomLeft', 'Rect');

    // stageNode.add(layerNode);
  }
  addArrow = () => {
    const { layerNode, stageNode, dispatch } = this.props;

    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        selectedShape: 'add-arrow',
      },
    });

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

    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        selectedShape: 'add-note',
      },
    });

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
          currentShape: e.target.parent,
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
      textarea.style.zIndex = '1000';
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
  // freeDrawing = () => {} 后面研究 加上！
  clearLayer = () => {
    const { layerNode, dispatch } = this.props;
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        selectedShape: 'reset',
      },
    });
    const groups = layerNode.getChildren(node => (
      node.getClassName() === 'Group'
    ));
    groups.destroy();
    layerNode.draw();
  }
  deleteCurrent = () => {
    const { layerNode, currentShape, dispatch } = this.props;
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        selectedShape: 'delete',
      },
    });
    currentShape.destroy();
    layerNode.draw();
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        currentShape: null,
      },
    });
  }
  download = () => {
    const canvas = document.getElementsByTagName('canvas')[0];
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    window.location.href = image;
  }
  handleOk = dispatch => (e) => {
    e.preventDefault();
    const canvas = document.getElementsByTagName('canvas')[0];
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        showModal: false,
        imgBase64: image,
      },
    });
  }
  handleCancel = dispatch => (e) => {
    e.preventDefault();
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        showModal: false,
      },
    });
  }
  render() {
    const { dispatch, image, currentShape, imageHeight, imageNode,
      selectedShape, stageNode, layerNode } = this.props;
    if (stageNode && (selectedShape === 'add-rect' || selectedShape === 'add-arrow' || selectedShape === 'add-note')) {
      // console.log('=== stageNode', stageNode);
      let isPaint = false;
      let startX = 0;
      let startY = 0;
      stageNode.on('contentMousedown', (e) => {
        isPaint = true;
        const evt = e.evt;
        startX = evt.layerX;
        startY = evt.layerY;
      });
      stageNode.on('contentMouseup', () => {
        isPaint = false;
      });
      stageNode.on('contentMousemove', () => {
        if (isPaint) {
          if (selectedShape === 'add-rect') {
            const rect = new Konva.Rect({
              width: 120,
              height: 50,
              stroke: 'red',
            });

            const rectGroup = new Konva.Group({
              x: startX,
              y: startY,
              draggable: true,
            });
            layerNode.add(rectGroup);
            rectGroup.add(rect);
            rectGroup.on('mouseover', () => {
              document.body.style.cursor = 'crosshair';
            });

            rectGroup.on('click', (ev) => {
              dispatch({
                type: 'canvas/stateWillUpdate',
                payload: {
                  currentShape: ev.target,
                },
              });
            });

            this.addAnchor(rectGroup, 0, 0, 'topLeft', 'Rect');
            this.addAnchor(rectGroup, 120, 0, 'topRight', 'Rect');
            this.addAnchor(rectGroup, 120, 51, 'bottomRight', 'Rect');
            this.addAnchor(rectGroup, 0, 51, 'bottomLeft', 'Rect');
          }
        }
        if (!isPaint) {
          layerNode.draw();
        }
      });
    }
    return (
      <div className={styles.wrapper}>
        <div className={styles.operation_bar}>
          <Icon type="file-add" data-type="add-rect" onClick={this.addRect} className={`${(selectedShape === 'add-rect') && styles.active}`} style={{ cursor: 'pointer' }} />
          <Icon type="arrow-down" data-type="add-arrow" onClick={this.addArrow} className={`${(selectedShape === 'add-arrow') && styles.active}`} style={{ cursor: 'pointer' }} />
          <Icon type="edit" data-type="add-note" onClick={this.addNote} className={`${(selectedShape === 'add-note') && styles.active}`} style={{ cursor: 'pointer' }} />
          <Popconfirm title="确认清空？" onConfirm={this.clearLayer} okText="确认" cancelText="取消">
            <Icon type="reload" style={{ cursor: 'pointer' }} />
          </Popconfirm>
          { currentShape !== null ?
            <Popconfirm title="确认删除？" onConfirm={this.deleteCurrent} okText="确认" cancelText="取消">
              <Icon type="delete" style={{ cursor: 'pointer' }} />
            </Popconfirm> :
            <Icon type="delete" style={{ color: '#DDDEDD' }} />
          }
        </div>
        <div style={{ border: '1px solid #eee' }}>
          <Stage
            id="currentCanvas"
            ref={this.getStageInstance}
            width={960}
            height={680}
            style={{ background: `url(${require('./../images/tb.png')})` }}
          >
            <Layer ref={this.getLayerInstance} name="shapes">
              <MainImage
                dispatch={dispatch}
                image={image}
                imageHeight={imageHeight}
                imageNode={imageNode}
                selectedShape={selectedShape}
              />
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

export default MyCanvas;
