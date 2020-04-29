import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './App.css';
import BoardGame from './../BoardGame/BoardGame';

class App extends Component {
  render() {
    return (
      <>
        <Row style={{ width: '100vw', height: '100vh' }}>
          <Col span={4}>user 1</Col>
          <Col span={16}>
            <BoardGame></BoardGame>
          </Col>
          <Col span={4}>user 2</Col>
        </Row>
      </>
    );
  }
}

export default App;
