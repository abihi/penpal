import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showRegistrationModal, hideRegistrationModal } from '../modules/publicApp/registration/modal';
import { Modal, Form, Input, Checkbox, Select } from 'antd';

class RegistrationModal extends Component {
  /* Layout settings for form */
  layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* Layout settings for remember me checkbox */
  tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

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
      label="Username"
      name="username"
      rules={[{ required: true}]}
      >
      <Input />
      </Form.Item>
      <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, type: 'email' }]}
      >
      <Input />
      </Form.Item>
      <Form.Item>
      <Select>
      
      </Select>
      </Form.Item>
      <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true}]}
      >
      <Input.Password />
      </Form.Item>
      <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
      <Checkbox>Remember me</Checkbox>
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
