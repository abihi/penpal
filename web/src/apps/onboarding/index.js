import React, { Component } from 'react';
import './index.scss';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {denormalize} from 'normalizr';
import {user} from '../../modules/entities';
import InterestDiscovery from './InterestDiscovery';
import AboutMe from './AboutMe';
import {changeOnboardingStep} from '../../modules/onboardingApp/process'
import {Steps, Modal, Carousel, Avatar, Button, message} from 'antd';

// routes
const routes = (
  <Route path="">
    <Route exact path="/" component={InterestDiscovery}/>
    <Route exact path="/about-me" component={AboutMe}/>
    <Route exact path="/preferences" component={null}/>
  </Route>
);

class OnboardingApp extends Component {
  state = {
    showIntro: true,
  };

  closeModal = () => {
    this.setState({showIntro: false});
  };

  prevStep = () => {
    const {currentStep, changeOnboardingStep} = this.props;
    if (currentStep > 0) {
      changeOnboardingStep(currentStep - 1);
    }
  };

  nextStep = () => {
    const {currentStep, changeOnboardingStep, currentUser} = this.props;
    // Validate that user is ready to change to next step
  };

  render() {

    return (
      <div className="onboarding-app">
        {routes}
        <Modal
          className="intro-modal"
          visible={this.state.showIntro}
          onCancel={this.closeModal}
          destroyOnClose={true}
          footer={null}
        >
          <Carousel className="intro-carousel" dots={true}>
            <div>
              <img src="https://snigel.s3.eu-north-1.amazonaws.com/assets/onboarding_interests.jpg" />
              <h3>Tell others about yourself</h3>
            </div>
            <div>
              <img src="https://snigel.s3.eu-north-1.amazonaws.com/assets/onboarding_about.jpg" />
              <h3>Share the interests you are into and passionate about</h3>
            </div>
            <div>
              <img src="https://snigel.s3.eu-north-1.amazonaws.com/assets/onboarding_preferences.jpg" />
              <h3>Set your preferences for the type of penpals and relations you are looking for</h3>
            </div>
          </Carousel>
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = store => {
  return {
    currentUser: denormalize(store.auth.currentUser, user, store.entities),
    currentStep: store.onboardingApp.process.currentStep,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeOnboardingStep: (step) => dispatch(changeOnboardingStep(step)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingApp);
