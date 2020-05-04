import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Row, Input, Col, Typography, List, Card } from 'antd';
import { LogoutOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;
const { Text } = Typography;
const HOME_SOCKET_HOST = 'http://localhost:3001';
const MEMORY_GAME_SOCKET_HOST = 'http://localhost:3001/memorygame';
let home;
let memoryGame;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineUserCount: 0,
      createdRoomName: '',
      joinRoomName: '',
      listRoom: [],
    };
  }

  componentDidMount() {
    const { currentRoom, history } = this.props;
    if (currentRoom) {
      return history.replace(`/memorygame/${currentRoom}`);
    }

    memoryGame = io(`${MEMORY_GAME_SOCKET_HOST}`);
    home = io(`${HOME_SOCKET_HOST}`);

    home.on('online-user-count', (number) => {
      this.setState({ onlineUserCount: number });
    });

    memoryGame.on('list-room', (listRoom) => {
      this.setState({ listRoom });
    });
  }

  componentWillUnmount() {
    if (home) {
      home.off('online-user-count');
    }
    if (memoryGame) {
      memoryGame.off('list-room');
    }
    memoryGame.close();
  }

  joinRoom = (joinRoomName) => {
    const { setCurrentRoom, history } = this.props;
    joinRoomName = joinRoomName.replace(/\s+/g, '').toLowerCase();
    setCurrentRoom(joinRoomName);
    setTimeout(() => {
      history.replace(`/memorygame/${joinRoomName}`);
    }, 200);
  };

  logOut = () => {
    const { history, clearCurrentRoom, clearToken } = this.props;
    clearCurrentRoom();
    clearToken();
    history.replace('/signin');
  };

  render() {
    const {
      onlineUserCount,
      joinRoomName,
      createdRoomName,
      listRoom,
    } = this.state;
    const { userInfo } = this.props;
    return (
      <>
        <Row style={{ marginBottom: '30px' }} justify="space-between">
          <Col lg={{ span: 6 }}></Col>
          <Col lg={{ span: 3 }} className="nav-set">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                this.logOut();
              }}
            >
              <LogoutOutlined style={{ fontSize: '15px' }} />
            </a>
            <Text strong style={{ paddingRight: '10px' }}>
              {userInfo ? userInfo.username : ''}
            </Text>
          </Col>
        </Row>
        <Row justify="center">
          <Col lg={{ span: 6 }} md={{ span: 12 }}>
            <Search
              placeholder="Room name"
              onSearch={(joinRoomName) => this.joinRoom(joinRoomName)}
              enterButton
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '30px' }}>
          <Col ls={{ span: 18 }} md={{ span: 20 }} sm={{ span: 22 }}>
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={listRoom}
              renderItem={(room) => (
                <List.Item style={{ textAlign: 'center' }}>
                  <Card title={room}>
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        this.joinRoom(room);
                      }}
                    >
                      <PlayCircleOutlined
                        style={{ fontSize: '30px', cursor: 'pointer' }}
                      />
                    </a>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentRoom: state.user.currentRoom,
    userInfo: state.user.info,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentRoom: (joinRoomName) =>
      dispatch({ type: 'SET_CURRENT_ROOM', payload: { joinRoomName } }),
    clearCurrentRoom: () => dispatch({ type: 'CLEAR_CURRENT_ROOM' }),
    clearToken: () => dispatch({ type: 'CLEAR_TOKEN' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
