import React, { Component } from 'react';

class PersonalApp extends Component {
  render() {
    return (
      <Layout className="personal-app">
        <Layout style={{ minHeight: '100vh' }}>
          <PrivateAppHeader />
          <Content className="private-content-container">
            {routes}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default PersonalApp;
