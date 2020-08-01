import React, { Component } from 'react';
import './index.scss';
import {Route} from 'react-router-dom';
import PrivateAppHeader from './Header';
import MainPrivatePage from '../../pages/private/MainPage';
import {Layout} from 'antd';
const {Content} = Layout;

// routes
const routes = (
  <Route path="" component={null}>
    <Route exact path="/" component={MainPrivatePage}/>
  </Route>
);

class PrivateApp extends Component {
  render() {
    return (
      <Layout className="private-app">
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
