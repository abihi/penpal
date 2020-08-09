import React, { Component } from 'react';
import './UserActionMenu.scss';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Divider} from 'antd';
import { logoutUser } from '../../modules/auth/logout';
import {
  BulbFilled
} from '@ant-design/icons';

class UserActionMenu extends Component {
  onSignOut = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  render() {
    return (
      <div className="user-action-menu">
        <Link to="/profile">
          <div className="action-line">Profile</div>
        </Link>
        <Divider />
        <Link to="/discover">
          <div className="action-line"><BulbFilled /> Discover</div>
        </Link>
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
