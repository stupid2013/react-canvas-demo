import React from 'react';
import { Modal, Form, Input } from 'antd';
// import Canvas from './../canvas-demo';

const FormItem = Form.Item;

/* eslint no-undef: 0 */
/* eslint global-require: 0 */
const EvidenceModal = ({
  dispatch,
  form,
}) => {
  const { getFieldDecorator } = form;
  const handleCancel = (e) => {
    e.preventDefault();
    dispatch({
      type: 'hubble/stateWillUpdate',
      payload: {
        showModal: false,
      },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        message.success(values.product);
        dispatch({
          type: 'hubble/stateWillUpdate',
          payload: {
            showModal: false,
          },
        });
      }
    });
  };
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
  return (
    <Modal
      title="新建广告版本"
      visible
      maskClosable={false}
      width={1080}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        123
      </div>
      <Form onSubmit={handleSubmit} style={{ width: '76%', margin: 'auto' }}>
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
      </Form>
    </Modal>
  );
};

export default Form.create()(EvidenceModal);
