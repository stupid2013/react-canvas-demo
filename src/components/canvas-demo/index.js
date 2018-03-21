import React from 'react';
import Konva from 'konva';
import { Icon, Popconfirm } from 'antd';
import { Stage, Layer } from 'react-konva';
import styles from './index.css';
import MainImage from './main-image';

/* eslint no-undef: 0 */
/* eslint global-require: 0 */
/* eslint no-underscore-dangle: 0 */
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

    if (shape.getClassName() === 'Arrow') {
      shape.setAttrs({
        pointerLength: 12,
        pointerWidth: 10,
        fill: 'red',
        stroke: 'red',
        strokeWidth: 3,
      });
    }

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
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
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
      anchor.setStrokeWidth(4);
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
    const { dispatch } = this.props;
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        selectedShape: 'add-rect',
      },
    });
  }
  addArrow = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        selectedShape: 'add-arrow',
      },
    });
  }
  addNote = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        selectedShape: 'add-note',
      },
    });
  }
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
    const { stageNode, currentShape, dispatch } = this.props;
    dispatch({
      type: 'canvas/stateWillUpdate',
      payload: {
        selectedShape: 'delete',
        currentShape: null,
      },
    });
    currentShape.destroy();
    stageNode.draw();
  }
  download = () => {
    // 原生转为base64格式
    // const canvas = document.getElementsByTagName('canvas')[0];
    // const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    // window.location.href = image;

    // konva的方法
    const { stageNode } = this.props;
    // stageNode.toImage({
    //   mimeType: 'image/png',
    //   callback: (img) => {
    //     console.log('=== img ', img);
    //   },
    // });
    stageNode.toDataURL({
      mimeType: 'image/png',
    });
  }
  render() {
    const { dispatch, image, currentShape, imageHeight, imageNode,
      selectedShape, stageNode, layerNode } = this.props;
    if (currentShape !== null) {
      const circles = currentShape.getChildren(node => (node.getClassName() === 'Circle'));
      circles.setAttrs({
        stroke: '#666',
        fill: '#ddd',
      });
      const currentId = currentShape._id;
      const groups = layerNode.getChildren(node => (node.getClassName() === 'Group'));
      const others = [];
      groups.forEach((item) => {
        if (item._id !== currentId) {
          others.push(item);
        }
      });
      const cirs = [];
      others.forEach((item) => {
        const cir = item.getChildren(node => (node.getClassName() === 'Circle'));
        if (cir) {
          cirs.push(...cir);
        }
      });
      if (cirs.length) {
        const group = new Konva.Collection(...cirs);
        group.setAttrs({
          stroke: 'transparent',
          fill: 'transparent',
        });
      }
      stageNode.draw();
    } else if (layerNode) {
      const all = layerNode.getChildren(node => (node.getClassName() === 'Group'));
      const circles = [];
      all.forEach((item) => {
        const cir = item.getChildren(node => (node.getClassName() === 'Circle'));
        if (cir) {
          circles.push(...cir);
        }
      });
      if (circles.length) {
        const group = new Konva.Collection(...circles);
        group.setAttrs({
          stroke: 'transparent',
          fill: 'transparent',
        });
        stageNode.draw();
      }
    }
    if (stageNode && (selectedShape === 'add-rect' || selectedShape === 'add-arrow' || selectedShape === 'add-note')) {
      stageNode.off('contentMousedown').on('contentMousedown', (e) => {
        if (currentShape === null) {
          const evt = e.evt;
          const startX = evt.layerX;
          const startY = evt.layerY;
          if (selectedShape === 'add-rect') {
            const rect = new Konva.Rect({
              width: 0,
              height: 0,
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

            rectGroup.on('mousedown', (ev) => {
              dispatch({
                type: 'canvas/stateWillUpdate',
                payload: {
                  currentShape: ev.target.getParent(),
                },
              });
            });

            this.addAnchor(rectGroup, 0, 0, 'topLeft', 'Rect');
            this.addAnchor(rectGroup, 0, 0, 'topRight', 'Rect');
            this.addAnchor(rectGroup, 0, 0, 'bottomLeft', 'Rect');
            this.addAnchor(rectGroup, 0, 0, 'bottomRight', 'Rect');

            stageNode.add(layerNode);

            dispatch({
              type: 'canvas/stateWillUpdate',
              payload: {
                currentShape: rectGroup,
              },
            });
          } else if (selectedShape === 'add-arrow') {
            const arrow = new Konva.Arrow({
              points: [0, 0, 0, 0],
            });

            const arrowGroup = new Konva.Group({
              x: startX,
              y: startY,
              draggable: true,
            });
            arrowGroup.on('mouseover', () => {
              document.body.style.cursor = 'crosshair';
            });
            layerNode.add(arrowGroup);
            arrowGroup.add(arrow);
            arrowGroup.on('mousedown', (ev) => {
              dispatch({
                type: 'canvas/stateWillUpdate',
                payload: {
                  currentShape: ev.target.getParent(),
                },
              });
            });
            this.addAnchor(arrowGroup, 0, 0, 'arrowLeft', 'Arrow');
            this.addAnchor(arrowGroup, 0, 0, 'arrowRight', 'Arrow');
            stageNode.add(layerNode);
            dispatch({
              type: 'canvas/stateWillUpdate',
              payload: {
                currentShape: arrowGroup,
              },
            });
          } else if (selectedShape === 'add-note') {
            const tagNode = new Konva.Tag({
              fill: 'black',
              width: 0,
              height: 0,
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
              x: startX,
              y: startY,
              draggable: true,
            });
            layerNode.add(noteGroup);
            noteGroup.add(tagNode);
            noteGroup.add(textNote);
            noteGroup.on('mousedown', (ev) => {
              document.body.style.cursor = 'crosshair';
              dispatch({
                type: 'canvas/stateWillUpdate',
                payload: {
                  currentShape: ev.target.getParent(),
                },
              });
            });
            this.addAnchor(noteGroup, 0, 0, 'topLeft', 'Tag');
            this.addAnchor(noteGroup, 0, 0, 'topRight', 'Tag');
            this.addAnchor(noteGroup, 0, 0, 'bottomLeft', 'Tag');
            this.addAnchor(noteGroup, 0, 0, 'bottomRight', 'Tag');
            stageNode.add(layerNode);

            dispatch({
              type: 'canvas/stateWillUpdate',
              payload: {
                currentShape: noteGroup,
              },
            });
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
              textarea.style.width = `${tagNode.width()}px`;
              textarea.style.height = `${tagNode.height()}px`;
              textarea.focus();

              textarea.addEventListener('keydown', (ev) => {
                if (ev.keyCode === 13) {
                  textNote.text(textarea.value);
                  layerNode.draw();
                  document.body.removeChild(textarea);
                }
              });
            });
          }
        }
      });
      stageNode.on('dblclick', () => {
        dispatch({
          type: 'canvas/stateWillUpdate',
          payload: {
            currentShape: null,
          },
        });
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
          <Icon type="download" onClick={this.download} style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ border: '1px solid #eee' }}>
          <Stage
            id="currentCanvas"
            ref={this.getStageInstance}
            width={960}
            height={600}
            style={{ background: `url(${require('./../images/tb.png')})` }}
          >
            <Layer name="shapes">
              <MainImage
                dispatch={dispatch}
                image={image}
                imageHeight={imageHeight}
                imageNode={imageNode}
                selectedShape={selectedShape}
              />
            </Layer>
            <Layer ref={this.getLayerInstance} />
          </Stage>
        </div>
      </div>
    );
  }
}

export default MyCanvas;
