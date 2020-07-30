import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { authenticateUser } from './modules/auth/currentUser';
import { Spin } from 'antd';
import LandingPageMain from './apps/PublicApp/index';

class App extends Component {
  componentDidMount() {
    const { user, authenticateUser } = this.props;
    if (!user.isAuthenticated) {
      authenticateUser();
    }

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
    user: store.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: () => dispatch(authenticateUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
