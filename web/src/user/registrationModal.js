import React, { Component } from 'react';
import './registrationModal.scss';
import { connect } from 'react-redux';
import { showRegistrationModal, hideRegistrationModal } from '../modules/publicApp/registration/modal';
import { Modal, Form, Input, Checkbox, Select } from 'antd';
import countries from '../mockdata/countries';

class RegistrationModal extends Component {
  handleOk = () => {
    // TODO
  };

  handleCancel = () => {
    const {hideRegistrationModal} = this.props;
    hideRegistrationModal();
  };

  onFinish = () => {

  };

  onFinishFailed = () => {

  };

  render() {

    return (
      <Modal
      visible={this.props.visible}
      onOk={this.handleOk}
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
            <input className="clean-text-input" />
          </div>
          <div className="row">
          <label>Country</label>
            <select className="clean-text-input">
            {
              countries.map(country => <option key={country.code} value={country.name}>{country.name}</option>)
            }
            </select>
          </div>
          <div className="row">
            <label>Email</label>
            <input className="clean-text-input" />
          </div>
          <div className="row">
            <label>Password</label>
            <input className="clean-text-input" placeholder="6+ characters" />
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
