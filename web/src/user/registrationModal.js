import React, { Component } from 'react';
import './registrationModal.scss';
import { connect } from 'react-redux';
import { showRegistrationModal, hideRegistrationModal } from '../modules/publicApp/registration/modal';
import { Modal, Form, Input, Checkbox, Select } from 'antd';
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import countries from '../mockdata/countries';
const axios = require('axios');
axios.defaults.withCredentials = true;


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

  isUsernameUnique = async username => {
      try {
        // wait for HTTP request and state change
        const result = await axios.post('/auth/register/username', {username});
        return result.data;
      } catch (error) {
        return false;
      }
  };

  onUsernameChange = async e => {
    let username = {...this.state.username};
    /* Set validating to true before actual validation to
    visualize loading icon while validation is pending*/
    username.validating = true;
    this.setState({username: username});

    /* initiate validation */
    username.value = e.target.value;

    let unique = await this.isUsernameUnique(e.target.value);
    unique ? username.valid = true : username.valid = false;
    console.log(unique, username.valid);

    username.validating = false;
    this.setState({username: username});
  };

  onCountryChange = e => {
    console.log(e.target.value);
  };

  isEmailUnique = async email => {
      try {
        // wait for HTTP request and state change
        const result = await axios.post('/auth/register/email', {email});
        return result.data;
      } catch (error) {
        return false;
      }
  };

  onEmailChange = async e => {
    let email = {...this.state.email};
    /* Set validating to true before actual validation to
    visualize loading icon while validation is pending*/
    email.validating = true;
    this.setState({email: email});

    /* initiate validation */
    email.value = e.target.value;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      let unique = await this.isEmailUnique(e.target.value);
      unique ? email.valid = true : email.valid = false;
      console.log(unique, email.valid);
    } else {
      email.valid = false;
    }

    email.validating = false;
    this.setState({email: email});
  };

  onPasswordChange = async e => {
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
            <div className="input-container">
              <input className="clean-text-input" onChange={this.onUsernameChange} />
              {!this.state.username.validating && this.state.username.valid ? <CheckCircleOutlined className="input-valid-icon" /> : <InfoCircleOutlined className="input-invalid-icon" />}
              {this.state.username.validating ? <LoadingOutlined className="input-validating-icon" /> : null}
            </div>
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
            <div className="input-container">
              <input type="email" className="clean-text-input" onChange={this.onEmailChange} />
              {!this.state.email.validating && this.state.email.valid ? <CheckCircleOutlined className="input-valid-icon" /> : <InfoCircleOutlined className="input-invalid-icon" />}
              {this.state.email.validating ? <LoadingOutlined className="input-validating-icon" /> : null}
            </div>
          </div>
          <div className="row">
            <label>Password</label>
            <div className="input-container">
              <input type="password" className="clean-text-input" placeholder="6+ characters" onChange={this.onPasswordChange} />
              {!this.state.password.validating && this.state.password.valid ? <CheckCircleOutlined className="input-valid-icon" /> : <InfoCircleOutlined className="input-invalid-icon" />}
              {this.state.password.validating ? <LoadingOutlined className="input-validating-icon" /> : null}
            </div>
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
