import React from 'react'
import { connect } from 'dva';
import { Layout } from 'antd'
import { loadProgress } from '@/utils/index'
import './App.less'

const { Content } = Layout
export default connect(({ common, loading }) => {
  return {
    ...common,
    loading
  }
})((props) => {
  console.log(props, '---app---')
  loadProgress(props.loading.global)
  return (<Layout className="layout">
    <Content style={{ width: '100%' }}>
      {props.children} 
    </Content>
  </Layout>)
})
