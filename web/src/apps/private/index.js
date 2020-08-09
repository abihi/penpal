import React, { Component } from 'react';
import './index.scss';
import {Route} from 'react-router-dom';
import PrivateAppHeader from './Header';
import DiscoverPage from '../../pages/private/Discover';
import ProfilePage from '../../pages/private/Profile';
import {Layout} from 'antd';
const {Content} = Layout;

// routes
const routes = (
  <Route path="">
    <Route exact path="/" component={DiscoverPage}/>
    <Route exact path="/discover" component={DiscoverPage}/>
    <Route exact path="/profile" component={ProfilePage}/>
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
