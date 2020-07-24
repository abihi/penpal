import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showRegistrationModal, hideRegistrationModal } from '../modules/publicApp/registration/modal';
import { Modal } from 'antd';

class RegistrationModal extends Component {
  handleOk = () => {
    // TODO
  };

  handleCancel = () => {
    const {hideRegistrationModal} = this.props;
    hideRegistrationModal();
  };

  render() {

    return (
      <Modal
      title="Register account"
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      >
      <p>form WIK</p>
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
