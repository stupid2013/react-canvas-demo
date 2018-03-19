import React from 'react';
import moment from 'moment';
import { hashHistory } from 'react-router';
import { Row, Col, Select, Button, DatePicker, Table, Input, message } from 'antd';

import styles from './css/index.css';

const { Option } = Select;
const { Search } = Input;

export default ({
  list,
  date,
  type,
  visible,
  dispatch,
}) => {
  const disabledDate = current => current && current.valueOf() > Date.now();
  const onChange = (dat, dateString) => dispatch({
    type: 'hubble/stateWillUpdate',
    payload: {
      date: dateString,
    },
  });
  const change = value => dispatch({
    type: 'hubble/stateWillUpdate',
    payload: {
      type: value,
    },
  });
  const check = () => {
    if (type !== '') {
      dispatch({
        type: 'hubble/stateWillUpdate',
        payload: {
          visible: true,
        },
      });
    } else {
      message.error('请选择监测经济主体！');
    }
  };
  const handleCheck = typ => (e) => {
    e.preventDefault();
    hashHistory.push(`/hubble/${typ}`);
  };
  const columns = [
    {
      title: '关键信息',
      dataIndex: 'keyword',
      key: 'keyword',
    },
    {
      title: '采集时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '网站网址',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '审查员',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        if (record.status === '未审查') {
          return (<a onClick={handleCheck('check')}>审查</a>);
        } else {
          return (<a onClick={handleCheck('show')}>查看</a>);
        }
      },
    },
  ];
  return (
    <div className={styles.container}>
      <header>
        <h2>网络经济主体审查</h2>
      </header>
      <div className={styles.content}>
        <div className={styles.wrapper1}>
          <Row gutter={16} className={styles.rowStyle}>
            <Col span={2} style={{ textAlign: 'right' }}>监测日期: </Col>
            <Col span={4}>
              <DatePicker value={moment(date)} disabledDate={disabledDate} onChange={onChange} style={{ width: '100%' }} />
            </Col>
            <Col span={2} style={{ textAlign: 'right' }}>监测经济主体: </Col>
            <Col span={4}>
              <Select value={`${type}`} onChange={change} style={{ width: '100%' }} placeholder="请选择...">
                <Option value="京东">京东</Option>
                <Option value="淘宝">淘宝</Option>
                <Option value="天猫">天猫</Option>
              </Select>
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={check}>审查</Button>
            </Col>
          </Row>
        </div>
        {visible &&
          <div className={styles.wrapper2}>
            <h2>{type} {moment(date).format('YYYY-MM-DD')} 审查列表</h2>
            <div style={{ marginTop: '20px' }}>
              <Row gutter={16} className={styles.rowStyle}>
                <Col span={1} style={{ textAlign: 'right' }}>状态: </Col>
                <Col span={4}>
                  <Select style={{ width: '100%' }} placeholder="请选择...">
                    <Option value="1">全部</Option>
                    <Option value="2">已审查</Option>
                    <Option value="3">未审查</Option>
                  </Select>
                </Col>
                <Col span={1} style={{ textAlign: 'right' }}>搜索: </Col>
                <Col span={4}>
                  <Search placeholder="搜索..." />
                </Col>
              </Row>
              <Table
                style={{ marginTop: '20px' }}
                bordered
                dataSource={list}
                rowKey={data => data.id}
                columns={columns}
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
};
