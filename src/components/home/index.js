import React from 'react';
import { hashHistory } from 'react-router';
import styles from './index.css';

export default () => {
  return (
    <div className={styles.wrapper}>
      <h1><a onClick={() => hashHistory.push('/canvas')}>基于konvas和react-canvas的涂鸦测试(demo of konvas)</a></h1>
      <h1><a onClick={() => hashHistory.push('/hubble')}>调用封装的canvas的组件 demo</a></h1>
    </div>
  );
};
