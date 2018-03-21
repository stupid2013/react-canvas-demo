import React from 'react';
import { Icon, Button, Table } from 'antd';
import { hashHistory } from 'react-router';

import styles from './css/check.css';
import CanvasModal from './modal';
import EditionModal from './edition-modal';

/* eslint global-require: 0 */
export default ({
  editions,
  showModal,
  dispatch,
  layerNode,
  stageNode,
  image,
  currentShape,
  imageHeight,
  imageNode,
  showEdition,
  showType,
}) => {
  const show = () => dispatch({
    type: 'hubble/stateWillUpdate',
    payload: {
      showModal: true,
    },
  });
  const handleShow = () => dispatch({
    type: 'hubble/stateWillUpdate',
    payload: {
      showEdition: true,
    },
  });
  const columns = [
    {
      title: '广告名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '广告类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '违法程度',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (<a onClick={handleShow}>查看</a>),
    },
  ];
  return (
    <div className={styles.wrapper}>
      <header>
        <h2><a onClick={() => (hashHistory.push('/'))}><Icon type="left" /> 返回</a> 违法审查</h2>
      </header>
      <div className={styles.content}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '49%' }}>
            {showType === 'check' && <div style={{ textAlign: 'right' }}><Button onClick={show} type="primary">证据框选</Button></div>}
            <div className={styles.imgWrapper}>
              <img alt="pic" src={require('./../images/test.png')} />
            </div>
          </div>
          <div style={{ width: '49%' }}>
            <div className={styles.section}>
              <h2>当前审核广告版本列表</h2>
              <Table
                bordered
                columns={columns}
                rowKey={record => record.id}
                dataSource={editions}
              />
            </div>
          </div>
        </div>
      </div>
      {showType === 'check' &&
        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => (hashHistory.push('/'))} type="primary" style={{ marginRight: '16px' }}>该页面无违法广告</Button>
          <Button onClick={() => (hashHistory.push('/'))} type="primary">完成审核</Button>
        </div>
      }
      {showModal &&
        <CanvasModal
          dispatch={dispatch}
          layerNode={layerNode}
          stageNode={stageNode}
          image={image}
          currentShape={currentShape}
          imageHeight={imageHeight}
          imageNode={imageNode}
        />
      }
      {showEdition &&
        <EditionModal
          dispatch={dispatch}
        />
      }
    </div>
  );
};
