import React, { Component } from 'react';
import { Modal } from 'antd';

export default class RegistrationModal extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {

    return (
      <Modal
      title="Register account"
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      >
      <p>form WIK</p>
      </Modal>
    );
  }
}
