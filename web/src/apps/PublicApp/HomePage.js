import React from 'react';
import './HomePage.scss';
import { Layout, Button } from 'antd';
const {Content} = Layout;

export default class HomePage extends React.Component {
  render() {

    return (
      <Content className="public-home-page">
        <div className="billboard-container">
          <div className="billboard-message-container">
            <h1>Find penpals across the world</h1>
            <p>Build meaningful relations with people from all over the world. Partake in the story of other’s lives and share yours.</p>
          </div>
          <div className="billboard"></div>
        </div>
        <div className="button-container"><Button>Log in</Button> <Button>Sign up</Button></div>
      </Content>
    );
  }
}
