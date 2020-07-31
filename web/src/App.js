import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { authenticateUser } from './modules/auth/currentUser';
import { Spin } from 'antd';
import PublicApp from './apps/PublicApp/index';
import PrivateApp from './apps/PrivateApp/index';

class App extends Component {
  componentDidMount() {
    const { user, authenticateUser } = this.props;
    if (!user.isAuthenticated) {
      authenticateUser();
    }

  }

  render() {
    const { mode } = this.props;
    const showLoadingScreen = false;

    return (
      <div className="app">
        {showLoadingScreen ? <div className="filler"><Spin size="large" /></div> : null}
        {mode.currentMode === 'public' ? <PublicApp /> : null }
        {mode.currentMode === 'private' ? <PrivateApp /> : null }
        {mode.currentMode === 'onboarding' ? null : null}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    mode: store.mode,
    user: store.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: () => dispatch(authenticateUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
