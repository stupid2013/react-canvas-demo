import React from 'react';
import { hashHistory } from 'react-router';
import styles from './index.css';

export default () => {
  return (
    <div className={styles.wrapper}>
      <h1><a onClick={() => hashHistory.push('/hubble')}>工商广告需求确认demo（emmm。。。后来有很多改动 = =）</a></h1>
      <h1><a onClick={() => hashHistory.push('/canvas')}>基于konvas和react-canvas的涂鸦测试</a></h1>
    </div>
  );
};
