import React, { Component } from 'react';
import './AboutMe.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {denormalize} from 'normalizr';
import {user} from '../../modules/entities';
import { changeOnboardingStep } from '../../modules/onboardingApp/process';
import LanguageTagInput from '../../components/input/LanguageTagInput';
import { AiFillHeart } from 'react-icons/ai';
import {Steps, Modal, Carousel, Avatar, Button, Typography} from 'antd';
const {Text} = Typography;


class AboutMe extends Component {


  render() {


    return (
      <div className="about-me-onboarding">
        <LanguageTagInput />
      </div>
    );
  }
}


const mapStateToProps = store => {
  return {
    currentStep: store.onboardingApp.process.currentStep,
    currentUser: denormalize(store.auth.currentUser.id, user, store.entities),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeOnboardingStep: (step) => dispatch(changeOnboardingStep(step)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe);
