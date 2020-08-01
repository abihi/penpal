import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import LeftPanel from '../../../components/LeftPanel';



class MainPrivatePage extends React.Component {
  render() {
    return (
      <div className="main-private-page">
        <LeftPanel />
      </div>
    );
  }
}

export default MainPrivatePage;
