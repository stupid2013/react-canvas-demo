import React from 'react';
import { Icon, Button, Tabs, Input, Table, Form, message } from 'antd';
import { hashHistory } from 'react-router';

import styles from './css/check.css';
import CanvasModal from './modal';
import EditionModal from './edition-modal';

const { TabPane } = Tabs;
const { Search } = Input;
const FormItem = Form.Item;

/* eslint global-require: 0 */
export default Form.create()(({
  editions,
  form,
  showModal,
  dispatch,
  layerNode,
  stageNode,
  image,
  currentShape,
  imageHeight,
  imageNode,
  imgBase64,
  showEdition,
  showType,
}) => {
  const { getFieldDecorator } = form;
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        message.success(values.product);
      }
    });
  };
  const show = () => dispatch({
    type: 'canvas/stateWillUpdate',
    payload: {
      showModal: true,
    },
  });
  const handleShow = () => dispatch({
    type: 'canvas/stateWillUpdate',
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
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 4,
      },
    },
  };
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
              {imgBase64 ?
                <img alt="pic" src={imgBase64} />
                :
                <img alt="pic" src={require('./images/test.png')} />
              }
            </div>
          </div>
          <div style={{ width: '49%' }}>
            {showType === 'check' &&
            <Tabs>
              <TabPane tab="广告版本列表" key="1">
                <Search style={{ width: '50%', marginBottom: '16px' }} placeholder="搜索..." />
                <Table
                  bordered
                  columns={columns}
                  dataSource={editions}
                  rowKey={record => record.id}
                />
              </TabPane>
              <TabPane tab="新建广告版本" key="2">
                <Form onSubmit={handleSubmit}>
                  <FormItem
                    {...formItemLayout}
                    label="发布平台"
                  >
                    <span>天猫</span>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="页面网址"
                  >
                    <span>https://www.tmall.com</span>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="产品名称"
                  >
                    {getFieldDecorator('product', {
                      rules: [{
                        required: true, message: '请输入产品名称',
                      }],
                    })(
                      <Input type="text" />,
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="广告主"
                  >
                    {getFieldDecorator('advertiser', {
                      rules: [{
                        required: true, message: '请输入广告主',
                      }],
                    })(
                      <Input type="text" />,
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="广告类别"
                  >
                    {getFieldDecorator('category', {
                      rules: [{
                        required: true, message: '请选择广告类别',
                      }],
                    })(
                      <Input type="text" />,
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="违法法规"
                  >
                    {getFieldDecorator('laws', {
                      rules: [{
                        required: true, message: '请选择违法法规',
                      }],
                    })(
                      <Input type="text" />,
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="违法明细"
                  >
                    <ul>
                      <li>
                        <p>违法条例1</p>
                        <p><span style={{ color: 'red', marginRight: '10px' }}>*</span><span style={{ color: 'red' }}>违法了违法了，就是，违法了。</span></p>
                      </li>
                      <li>
                        <p>违法条例2</p>
                        <p><span style={{ color: 'red', marginRight: '10px' }}>*</span><span style={{ color: 'red' }}>违法了违法了，就是，违法了。</span></p>
                      </li>
                    </ul>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="违法备注"
                  >
                    {getFieldDecorator('remark', {
                      rules: [{
                        required: true, message: '请添加备注',
                      }],
                    })(
                      <Input type="textarea" rows={3} />,
                    )}
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">保存</Button>
                    <Button style={{ marginLeft: '16px' }}>取消</Button>
                  </FormItem>
                </Form>
              </TabPane>
            </Tabs>
            }
            {showType === 'show' &&
              <div className={styles.section}>
                <h2>当前审核广告版本列表</h2>
                <Table
                  bordered
                  columns={columns}
                  rowKey={record => record.id}
                  dataSource={editions}
                />
              </div>
            }
          </div>
        </div>
        {showType === 'check' &&
          <div className={styles.section}>
            <h2>当前审核广告版本列表</h2>
            <Table
              bordered
              columns={columns}
              rowKey={record => record.id}
              dataSource={editions}
            />
          </div>
        }
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
});
