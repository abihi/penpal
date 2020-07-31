import React, { Component } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import UserActionMenu from './UserActionMenu';
import {Avatar, Layout, Popover} from 'antd';
import {
  UserOutlined
} from '@ant-design/icons';
const {Header} = Layout;


class PrivateAppHeader extends Component {
  render() {
    const currentPath = this.props.location.pathname;
    console.log(currentPath);
    return (

      <Header className="private-app-header">
        <div className="left-aligned">
          <Link to="/">Snigel</Link>
        </div>
        <div className="right-aligned">
          <Popover content={<UserActionMenu />} className="avatar-popover">
            <Avatar style={{ backgroundColor: 'grey', verticalAlign: 'middle' }} size="large" gap={10}>
              <UserOutlined />
            </Avatar>
          </Popover>
        </div>
      </Header>
    );
  }
}

export default withRouter(connect(null, null)(PrivateAppHeader));
