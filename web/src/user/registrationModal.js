import React, { Component } from 'react';
import './registrationModal.scss';
import { connect } from 'react-redux';
import { showRegistrationModal, hideRegistrationModal } from '../modules/publicApp/registration/modal';
import { Modal, Form, Input, Checkbox, Select } from 'antd';
import countries from '../mockdata/countries';

class RegistrationModal extends Component {
  state = {
    username: {value: null, valid: false, validating: false},
    country: {value: 'Afghanistan', valid: true, validating: false},
    email: {value: null, valid: false, validating: false},
    password: {value: null, valid: false, validating: false},
  };

  handleOk = () => {
    // TODO
    alert("OK");
  };

  handleCancel = () => {
    const {hideRegistrationModal} = this.props;
    hideRegistrationModal();
  };

  onFinish = () => {

  };

  onFinishFailed = () => {

  };

  onUsernameChange = e => {
    console.log(e.target.value);
  };

  onCountryChange = e => {
    console.log(e.target.value);
  };

  onEmailChange = e => {
    let email = {...this.state.email};

    email.value = e.target.value;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      email.valid = true;
    } else {
      email.valid = false;
    }

    this.setState({email: email});
  };

  onPasswordChange = e => {
    let password = {...this.state.password};

    password.value = e.target.value;
    if (e.target.value.length >= 6) {
      password.valid = true;
    } else {
      password.valid = false;
    }

    this.setState({password: password});
  };

  render() {

    return (
      <Modal
      visible={this.props.visible}
      onCancel={this.handleCancel}
      closable={false}
      footer={null}
      className="registration-modal"
      width="1080px"
      >
        <div className="image-art-container">
          <h1>Discover penpals from all over the world.</h1>
          <div className="image-art" />
          <p className="art-credit">Art by <a href="https://dribbble.com/tarka">Peter Tarka</a></p>
        </div>
        <div className="form">
        <h2>Welcome to Snigel =)</h2>
          <div className="row">
            <label>Username</label>
            <input className="clean-text-input" onChange={this.onUsernameChange} />
          </div>
          <div className="row">
          <label>Country</label>
            <select className="clean-select" onChange={this.onCountryChange}>
            {
              countries.map(country => <option key={country.code} value={country.name}>{country.name}</option>)
            }
            </select>
          </div>
          <div className="row">
            <label>Email</label>
            <input type="email" className="clean-text-input" onChange={this.onEmailChange} />
          </div>
          <div className="row">
            <label>Password</label>
            <input type="password" className="clean-text-input" placeholder="6+ characters" onChange={this.onPasswordChange} />
          </div>
          <div className="row">
            <button className="clean-button-primary" onClick={this.handleOk}>Create Account</button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = store => {
  return {
    registrationStep: store.publicApp.registration.flow.step,
    visible: store.publicApp.registration.modal.visible
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showRegistrationModal: () => dispatch(showRegistrationModal()),
    hideRegistrationModal: () => dispatch(hideRegistrationModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationModal);
