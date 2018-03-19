import React from 'react';
import { Modal, Form, Button } from 'antd';

const FormItem = Form.Item;

const styles = {
  background: '#F6F7F6',
  padding: '5px 16px',
  borderRadius: '5px',
};

export default ({
  dispatch,
}) => {
  const handleCancel = () => dispatch({
    type: 'hubble/stateWillUpdate',
    payload: {
      showEdition: false,
    },
  });
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  return (
    <Modal
      visible
      maskClosable={false}
      onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel} key="close" type="primary">关闭</Button>,
      ]}
      title="版本详情"
    >
      <Form style={{ marginTop: '32px' }}>
        <FormItem {...formItemLayout} label="发布平台" colon>
          <div style={styles}>发布平台</div>
        </FormItem>
        <FormItem {...formItemLayout} label="页面网址" colon>
          <div style={styles}>页面网址</div>
        </FormItem>
        <FormItem {...formItemLayout} label="产品名称" colon>
          <div style={styles}>产品名称</div>
        </FormItem>
        <FormItem {...formItemLayout} label="广告分类" colon>
          <div style={styles}>广告分类</div>
        </FormItem>
        <FormItem {...formItemLayout} label="违法程度" colon>
          <div style={styles}>违法程度</div>
        </FormItem>
        <FormItem {...formItemLayout} label="广告主" colon>
          <div style={styles}>广告主</div>
        </FormItem>
        <FormItem {...formItemLayout} label="广告类型" colon>
          <div style={styles}>
            广告类型
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label="媒体名称" colon>
          <div style={styles}>媒体名称</div>
        </FormItem>
        <FormItem {...formItemLayout} label="违法证据" colon>
          <div>
            违法证据的图片
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label="原始图片" colon>
          <div>
            原始图片
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label="违反法规" colon>
          <div style={styles}>
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
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label="违法备注" colon>
          <div style={styles}>违法备注</div>
        </FormItem>
      </Form>
    </Modal>
  );
};
