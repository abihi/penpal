import React, { Component } from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {denormalize} from 'normalizr';
import {user} from '../../modules/entities';
import {changeOnboardingStep} from '../../modules/onboardingApp/process'
import {Steps, Modal, Carousel, Avatar, Button, message} from 'antd';


class InterestDiscovery extends Component {
  render() {

    return (
      <div className="interest-discovery">

      </div>
    );
  }
}


const mapStateToProps = store => {
  return {
    currentUser: denormalize(store.auth.currentUser, user, store.entities),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InterestDiscovery);
