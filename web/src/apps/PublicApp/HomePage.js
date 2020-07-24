import React, { Component } from 'react';
import './HomePage.scss';
import { Layout, Button } from 'antd';
const {Content} = Layout;

class HomePage extends Component {
  onSingUpClick = () => {
    const { changeRegistrationFlowStep, step, showRegistrationModal } = this.props;
    /*
    Should always display the registration modal onclick. If the
    registration flow is at step 0 it should be changed to step 1,
    to initiate the registration process.
    */
    showRegistrationModal();
    if (step === 0) {
      changeRegistrationFlowStep(1);
    }
  }

  render() {

    return (
      <Content className="public-home-page">
        <div className="billboard-container">
          <div className="billboard-message-container">
            <h1>Find penpals across the world</h1>
            <p>Build meaningful relations with people from all over the world. Partake in the story of other’s lives and share yours.</p>
          </div>
          <div className="billboard"></div>
        </div>
        <div className="button-container">
          <Button>Log in</Button>
          <Button onClick={}>Sign up</Button>
        </div>
      </Content>
    );
  }
}

import { connect } from 'react-redux';
import { changeRegistrationFlowStep } from './modules/publicApp/registration/flow';
import { showRegistrationModal, hideRegistrationModal } from './modules/publicApp/registration/modal';

const mapStateToProps = store => {
  return {
    registrationStep: store.publicApp.registration.flow.step
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showRegistrationModal: () => dispatch(showRegistrationModal()),
    hideRegistrationModal: () => dispatch(hideRegistrationModal()),
    changeRegistrationFlowStep: (step) => dispatch(changeRegistrationFlowStep(step))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
