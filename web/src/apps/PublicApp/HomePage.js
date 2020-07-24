import React from 'react';
import './HomePage.scss';
import { Layout, Button } from 'antd';
const {Content} = Layout;

export default class HomePage extends React.Component {
  render() {

    return (
      <Content className="public-home-page">
        <div className="billboard-container">
          <div className="billboard"></div>
        </div>
        <div className="button-container"><Button>Log in</Button> <Button>Sign up</Button></div>
      </Content>
    );
  }
}
