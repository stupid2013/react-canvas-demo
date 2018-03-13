import React from 'react';
import { Row, Col, Select, Button, DatePicker } from 'antd';

import styles from './css/index.css';

const { Option } = Select;

export default () => {
  return (
    <div className={styles.container}>
      <header>
        <h2>网络经济主体审查</h2>
      </header>
      <div className={styles.content}>
        <div className={styles.wrapper1}>
          <Row gutter={16} style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Col span={2} style={{ textAlign: 'right' }}>检测日期: </Col>
            <Col span={4}>
              <DatePicker style={{ width: '100%' }} />
            </Col>
            <Col span={2} style={{ textAlign: 'right' }}>监测经济主体: </Col>
            <Col span={4}>
              <Select style={{ width: '100%' }} placeholder="请选择...">
                <Option value="1">京东</Option>
                <Option value="2">淘宝</Option>
                <Option value="3">天猫</Option>
              </Select>
            </Col>
            <Col span={2}>
              <Button type="primary">审查</Button>
            </Col>
          </Row>
        </div>
        <div className={styles.wrapper2}>
          <h2>京东 2017-12-11 审查列表</h2>
        </div>
      </div>
    </div>
  );
};
