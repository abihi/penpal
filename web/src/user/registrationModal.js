import React, { Component } from 'react';
import './registrationModal.scss';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { country } from '../modules/entities';
import { hideRegistrationModal } from '../modules/publicApp/registration/modal';
import { getCountries } from '../modules/countries/get';
import { registerUser } from '../modules/auth/register';
import { Modal } from 'antd';
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
const axios = require('axios');
axios.defaults.withCredentials = true;


class RegistrationModal extends Component {
  state = {
    username: {value: null, valid: false, validating: false},
    birthdate: {value: null, valid: false, validating: false},
    country: {value: {id: 1, name: 'Afghanistan'}, valid: true, validating: false},
    email: {value: null, valid: false, validating: false},
    password: {value: null, valid: false, validating: false},
  };

  componentDidMount = () => {
    const {getCountries} = this.props;
    getCountries();
  }

  handleOk = () => {
    const { registerUser } = this.props;
    const { username, birthdate, country, email, password } = this.state;
    /* Check that all provided values are valid*/
    if(username.valid && country.valid && email.valid && password.valid) {
      registerUser(username.value, birthdate.balue, country.value.id, email.value, password.value);
    } else {
      console.error("Provided values are not valid");
    }
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

    username.validating = false;
    this.setState({username: username});
  };

  onBirthdateChange = e => {
    let birthdate = {...this.state.birthdate};

    birthdate.value = new Date(e.target.value);
    const now = new Date(Date.now());
    const maxDate = new Date(now.getFullYear() - 14, now.getMonth(), now.getDay());
    const minDate = new Date(now.getFullYear() - 120, now.getMonth(), now.getDay());
    /* Check that age is between 14 years and less than 120 years */
    if(birthdate.value > minDate && birthdate.value < maxDate) {
      birthdate.valid = true;
    } else {
      birthdate.valid = false;
    }

    this.setState({birthdate: birthdate});
  };

  onCountryChange = e => {
    const { countries } = this.props;
    let country = {...this.state.country};

    /* Find country object in list of countries based on name */
    country.value = countries.find(c => c.name === e.target.value);

    /* If no country with same name is found in list undefined is returned */
    if(country.value !== undefined) {
      country.valid = true;
    } else {
      country.valid = false;
    }

    this.setState({country: country});
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

    const now = new Date(Date.now());
    // YYYY-MM-DD format required for date input min / max boundaries
    let maxDate = new Date(now.getFullYear() - 14, now.getMonth(), now.getDate());
    maxDate = `${maxDate.getFullYear()}-${maxDate.getMonth() >= 10 ? maxDate.getMonth() + 1 : `0${maxDate.getMonth() + 1}`}-${maxDate.getDate() >= 10 ? maxDate.getDate() : `0${maxDate.getDate()}`}`;
    let minDate = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate());
    minDate = `${minDate.getFullYear()}-${minDate.getMonth() >= 10 ? minDate.getMonth() + 1 : `0${minDate.getMonth() + 1}`}-${minDate.getDate() >= 10 ? minDate.getDate() : `0${minDate.getDate()}`}`;

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
            <label>Birthdate</label>
            <div className="input-container">
              <input className="clean-text-input" type="date" min={minDate} max={maxDate} onChange={this.onBirthdateChange} />
              {!this.state.birthdate.validating && this.state.birthdate.valid ? <CheckCircleOutlined className="input-valid-icon" /> : <InfoCircleOutlined className="input-invalid-icon" />}
              {this.state.birthdate.validating ? <LoadingOutlined className="input-validating-icon" /> : null}
            </div>
          </div>
          <div className="row">
          <label>Country</label>
            <div className="input-container">
              <select className="clean-select" onChange={this.onCountryChange}>
              {
                !this.props.countriesFetched ? null :
                this.props.countries.map(country => <option key={country.id} value={country.name}>{country.name}</option>)
              }
              </select>
              {this.props.countriesFetching ? <LoadingOutlined className="input-validating-icon" /> : null}
            </div>
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
            <button className="clean-button-primary" onClick={this.handleOk}>Sign up</button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = store => {
  return {
    registrationStep: store.publicApp.registration.flow.step,
    visible: store.publicApp.registration.modal.visible,
    countries: denormalize(store.countries.get.countries, [country], store.entities),
    countriesFetching: store.countries.get.fetching,
    countriesFetched: store.countries.get.fetched,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideRegistrationModal: () => dispatch(hideRegistrationModal()),
    getCountries: () => dispatch(getCountries()),
    registerUser: (username, birthdate, country_id, email, password) => dispatch(registerUser(username, birthdate, country_id, email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationModal);
