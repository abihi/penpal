import React, { Component } from 'react';
import './loginModal.scss';
import { connect } from 'react-redux';
import { hideLoginModal } from '../modules/publicApp/login/modal';
import { loginUser } from '../modules/user/login';
import { Modal } from 'antd';
const axios = require('axios');
axios.defaults.withCredentials = true;


class LoginModal extends Component {
  state = {
    username: '',
    password: '',
  }

  handleCancel = () => {
    const { hideLoginModal } = this.props;
    hideLoginModal();
  };

  onFinish = () => {

  };

  onFinishFailed = () => {

  };

  onUsernameChange = async e => {
    let username = {...this.state.username};
    this.setState({username: e.target.value});
  };

  onPasswordChange = async e => {
    let password = {...this.state.password};
    this.setState({password: e.target.value});
  };

  render() {

    return (
      <Modal
      visible={this.props.visible}
      onCancel={this.handleCancel}
      closable={false}
      footer={null}
      className="login-modal"
      width="1080px"
      >
        <div className="image-art-container">
          <h1>Any new letters from your penpals today?</h1>
          <div className="image-art" />
          <p className="art-credit">Art by <a href="https://dribbble.com/tarka">Peter Tarka</a></p>
        </div>
        <div className="form">
        <h2>Welcome back =)</h2>
          <div className="row">
            <label>Username</label>
            <div className="input-container">
              <input className="clean-text-input" onChange={this.onUsernameChange} />
            </div>
          </div>
          <div className="row">
            <label>Password</label>
            <div className="input-container">
              <input type="password" className="clean-text-input" placeholder="6+ characters" onChange={this.onPasswordChange} />
            </div>
          </div>
          <div className="row">
            <button className="clean-button-primary" onClick={this.handleOk}>Sign in</button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = store => {
  return {
    visible: store.publicApp.login.modal.visible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideLoginModal: () => dispatch(hideLoginModal()),
    loginUser: () => dispatch(loginUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
