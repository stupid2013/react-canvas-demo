import React from 'react';
import { Icon } from 'antd';

/* eslint no-undef: 0 */
class Operations extends React.Component {
  componentDidMount() {
    // console.log('====== ', this.refs.text);
  }
  addRect = () => {
  }
  render() {
    return (
      <div style={{ fontSize: '24px', lineHeight: '2', width: '1em', marginRight: '32px' }}>
        <Icon type="file-add" onClick={this.addRect} style={{ cursor: 'pointer' }} />
        <Icon type="arrow-down" style={{ cursor: 'pointer' }} />
        <Icon type="edit" style={{ cursor: 'pointer' }} />
        <Icon type="reload" style={{ cursor: 'pointer' }} />
        <Icon type="delete" style={{ cursor: 'pointer' }} />
      </div>
    );
  }
}

export default Operations;
