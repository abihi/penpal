import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import LeftPanel from '../../../components/LeftPanel';
import { Typography } from 'antd';
const { Title } = Typography;

const mock = {
  username: 'Sunflower95',
  age: 25,
};

class DiscoverPage extends React.Component {
  render() {
    return (
      <div className="discover-page">
        <LeftPanel />
        <div className="user-stack">
          <div className="user-cover">
            <div className="cover-details">
              <h1>{mock.username}</h1>
              <h4 >{mock.age}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscoverPage;
