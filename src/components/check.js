import React from 'react';
import { Icon, Button, Tabs, Input, Table, Form } from 'antd';
import { hashHistory } from 'react-router';

import styles from './css/check.css';

const { TabPane } = Tabs;
const { Search } = Input;
const FormItem = Form.Item;

/* eslint global-require: 0 */
export default Form.create()(({
  editions,
  form,
}) => {
  const { getFieldDecorator } = form;
  const handleSubmit = () => {};
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
      render: () => (<a>查看</a>),
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
        <div style={{ width: '49%' }}>
          <div style={{ textAlign: 'right' }}><Button type="primary">证据框选</Button></div>
          <div className={styles.imgWrapper}>
            <img alt="pic" src={require('./images/test.png')} />
          </div>
        </div>
        <div style={{ width: '49%' }}>
          <Tabs>
            <TabPane tab="广告版本列表" key="1">
              <Search style={{ width: '50%', marginBottom: '16px' }} placeholder="搜索..." />
              <Table
                bordered
                columns={columns}
                dataSource={editions}
              />
            </TabPane>
            <TabPane tab="新建广告版本" key="2">
              <Form onSubmit={handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="发布平台"
                >
                  {getFieldDecorator('platform', {
                    rules: [{
                      type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                      required: true, message: 'Please input your E-mail!',
                    }],
                  })(
                    <Input />,
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="页面网址"
                >
                  {getFieldDecorator('url', {
                    rules: [{
                      required: true, message: 'Please input your password!',
                    }],
                  })(
                    <Input type="password" />,
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="产品名称"
                >
                  {getFieldDecorator('product', {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }],
                  })(
                    <Input type="password" />,
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="广告主"
                >
                  {getFieldDecorator('advertiser', {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }],
                  })(
                    <Input type="password" />,
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="广告类别"
                >
                  {getFieldDecorator('category', {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }],
                  })(
                    <Input type="password" />,
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="违法法规"
                >
                  {getFieldDecorator('laws', {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }],
                  })(
                    <Input type="password" />,
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="违法明细"
                >
                  {getFieldDecorator('lawitems', {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }],
                  })(
                    <Input type="password" />,
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="违法备注"
                >
                  {getFieldDecorator('remark', {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }],
                  })(
                    <Input type="password" />,
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">保存</Button>
                  <Button style={{ marginLeft: '16px' }}>取消</Button>
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
});
