import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import PrivateAppHeader from './Header';
import {Layout} from 'antd';
const {Content} = Layout;

// routes
const routes = (
  <Route path="" component={null}>
    <Route exact path="/" component={null}/>
  </Route>
);

class PrivateApp extends Component {
  render() {
    return (
      <Layout className="personal-app">
        <Layout style={{ minHeight: '100vh' }}>
          <PrivateAppHeader />
          <Content className="private-content-container">
            {routes}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default PrivateApp;
