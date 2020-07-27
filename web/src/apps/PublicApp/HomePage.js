import React, { Component } from 'react';
import './HomePage.scss';
import { connect } from 'react-redux';
import { changeRegistrationFlowStep } from '../../modules/publicApp/registration/flow';
import { showLoginModal } from '../../modules/publicApp/login/modal';
import { showRegistrationModal, hideRegistrationModal } from '../../modules/publicApp/registration/modal';
import LoginModal from '../../user/loginModal';
import RegistrationModal from '../../user/registrationModal';
import { Layout, Button } from 'antd';
const {Content} = Layout;

class HomePage extends Component {
  onSignInClick = () => {
    const { showLoginModal } = this.props;
    showLoginModal();
  };

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
  };

  render() {

    return (
      <Content className="public-home-page">
        <div className="billboard-container neumorphic-billboard">
          <div className="billboard-message-container">
            <h1>Find penpals across the world</h1>
            <p>Build meaningful relations with people from all over the world. Partake in the story of other’s lives and share yours.</p>
          </div>
          <div className="billboard"></div>
        </div>
        <div className="button-container">
          <Button className="neumorphic-button" onClick={this.onSignInClick}>Log in</Button>
          <Button className="neumorphic-button-primary" onClick={this.onSingUpClick}>Sign up</Button>
        </div>
        <LoginModal />
        <RegistrationModal />
      </Content>
    );
  }
}


const mapStateToProps = store => {
  return {
    registrationStep: store.publicApp.registration.flow.step
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLoginModal: () => dispatch(showLoginModal()),
    showRegistrationModal: () => dispatch(showRegistrationModal()),
    hideRegistrationModal: () => dispatch(hideRegistrationModal()),
    changeRegistrationFlowStep: (step) => dispatch(changeRegistrationFlowStep(step))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
