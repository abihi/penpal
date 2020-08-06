import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import WorldMap from '../../../WorldMap';
import { Typography } from 'antd';
import {
  HeartFilled
} from '@ant-design/icons';

class ProfilePage extends React.Component {

  render() {
    return (
      <div className="profile-page">
        <WorldMap />
      </div>
    );
  }
}

export default ProfilePage;
