import React from 'react';
import { connect } from 'dva';
import { Nav0 } from 'antd-landing'
import {
  Nav00DataSource,
} from './data'
import './index.less';

function IndexPage(props) {
  console.log('props: ', props)
  return (
    <div className='normal'>
      <Nav0 dataSource={Nav00DataSource} />
      <h1 className='title'>Yay! Welcome to dva!</h1>
      <div className='welcome' />
      <ul className='list'>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
