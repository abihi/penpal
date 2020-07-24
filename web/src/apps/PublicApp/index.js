import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import './index.scss';
import LandingPageHeader from './Header';
import LandingPageFooter from './Footer';
import HomePage from './HomePage';
import {Layout} from 'antd';
const {Content} = Layout;

// routes
const routes = (
  <Route path="" component={null}>
    <Route exact path="/" component={HomePage}/>
    <Route exact path="/user/login" component={null}/>
    <Route exact path="/user/register" component={null}/>
  </Route>
);


class PublicApp extends React.Component {
  render() {

    return (

      <Layout className="landing-pages">
        <LandingPageHeader/>
        <Content className="public-content-container">
          {routes}
        </Content>
        <LandingPageFooter />
      </Layout>

    );
  }
}

const mapStateToProps = store => {
  return {

  };
};

export default connect(mapStateToProps, null)(PublicApp);
