import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import LandingPageMain from './apps/PublicApp/index';

class App extends Component {
  componentDidMount() {
    //const { user, fetchUserCredentials } = this.props;
    //if (!user.authenticate.isAuthenticated) {
      //fetchUserCredentials();
    //}
  }

  render() {
    const showLoadingScreen = false;
    const currentMode = 'public';

    return (
      <div className="app">
        {showLoadingScreen ? <div className="filler"><Spin size="large" /></div> : null}
        {currentMode === 'public' ? <LandingPageMain /> : null }
        {currentMode === 'private' ? null : null }
        {currentMode === 'onboarding' ? null : null}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
