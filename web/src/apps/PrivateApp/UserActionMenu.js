import React, { Component } from 'react';
import './UserActionMenu.scss';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Avatar, Divider, Layout, Popover} from 'antd';
import { logoutUser } from '../../modules/auth/logout';
class UserActionMenu extends Component {
  onSignOut = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  render() {
    return (
      <div className="user-action-menu">
        <div className="action-line">Profile</div>
        <Divider />
        <div className="action-line">Account Settings</div>
        <div className="action-line" onClick={this.onSignOut}>Sign Out</div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserActionMenu);
