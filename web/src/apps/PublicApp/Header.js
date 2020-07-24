import React, { Component } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Layout} from 'antd';
const {Header} = Layout;


class LandingPageHeader extends Component {
  render() {
    const currentPath = this.props.location.pathname;

    return (

      <Header className="landing-pages-header">
        <div className="left-aligned">
        <Link to="/">Snigel</Link>
        </div>
        <div className="right-aligned">
          <Link to="/">Mission</Link>
          <Link to="/">About</Link>
        </div>
      </Header>
    );
  }
}

export default withRouter(connect(null, null)(LandingPageHeader));
