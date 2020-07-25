import React, { Component } from 'react';
import './registrationModal.scss';
import { connect } from 'react-redux';
import { showRegistrationModal, hideRegistrationModal } from '../modules/publicApp/registration/modal';
import { Modal, Form, Input, Checkbox, Select } from 'antd';
import countries from '../mockdata/countries';

class RegistrationModal extends Component {
  /* Layout settings for form */
  layout = {
    wrapperCol: { span: 16 },
  };

  /* Form validation rules */
  validateMessages = {
    required: '${label} is required',
    types: {
      email: 'Not a valid email address'
    }
  };

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
      title="Sign up"
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      className="registration-modal"
      >
      <Form
      {...this.layout}
      name="form"
      validateMessages={this.validateMessages}
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
      >
      <Form.Item
      name="username"
      rules={[{ required: true}]}
      >
      <label>Username</label>
      <input className="neumorphic-text-input" />
      </Form.Item>
      <Form.Item
      name="country"
      rules={[{ required: true}]}
      >
      <label>Country</label>
      <select className="neumorphic-select-input">
        {
          countries.map(country => <option key={country.code} value={country.name}>{country.name}</option>)
        }
      </select>
      </Form.Item>
      <Form.Item
      name="email"
      rules={[{ required: true, type: 'email' }]}
      >
      <label>Email</label>
      <input className="neumorphic-text-input" />
      </Form.Item>
      <Form.Item
      name="password"
      rules={[{ required: true}]}
      >
      <label>Password</label>
      <input className="neumorphic-text-input" />
      </Form.Item>
      </Form>
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
