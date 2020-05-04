import React, { Component } from 'react';
import io from 'socket.io-client';
import { Row, Col, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import BoardGame from './../../components/BoardGame/BoardGame';
import Player from './../../components/Player/Player';
import * as config from './../../constants/config';
import './MemoryGame.css';
const { Text } = Typography;
const MEMORY_GAME_SOCKET_HOST = `${config.HOST}/memorygame`;
let memoryGame;
class MemoryGame extends Component {
  UNSAFE_componentWillMount() {
    const {
      currentRoom,
      setDataOfCards,
      userInfo,
      setInfoOtherUser,
      clearCurrentRoom,
      setTurn,
      history,
      clearPlayer,
      clearBoardGame,
    } = this.props;
    memoryGame = io(MEMORY_GAME_SOCKET_HOST);

    memoryGame.emit(
      'join-room-memorygame',
      { currentRoom, userInfo },
      (error) => {
        if (error) {
          alert(error.message);
          clearCurrentRoom();
          clearBoardGame();
          clearPlayer();
          this.props.history.replace('/');
        }
      }
    );

    memoryGame.on('get-data-of-cards', ({ dataOfCard }) => {
      setDataOfCards(dataOfCard);
    });
    memoryGame.on('get-info-other-player', ({ userInfo }) => {
      setInfoOtherUser(userInfo);
    });
    memoryGame.on('set-turn', (turn) => {
      setTurn(turn);
    });
    memoryGame.on('response-leave-room', () => {
      alert('Player2 has left');
      clearCurrentRoom();
      history.replace('/');
    });
    memoryGame.on('response-win', (userInfo) => {
      alert(`${userInfo.username} win`);
      this.leaveRoom();
    });
  }

  leaveRoom = () => {
    const {
      currentRoom,
      clearCurrentRoom,
      history,
      clearBoardGame,
      clearPlayer,
    } = this.props;
    memoryGame.emit('leave-memoryGame', currentRoom);
    clearCurrentRoom();
    clearBoardGame();
    clearPlayer();
    history.replace('/');
  };

  componentWillUnmount() {
    const { clearCurrentRoom, clearBoardGame, clearPlayer } = this.props;
    clearCurrentRoom();
    if (memoryGame) {
      memoryGame.off('get-data-of-cards');
      memoryGame.off('get-info-other-player');
      memoryGame.off('set-turn');
      clearBoardGame();
      clearPlayer();
      memoryGame.close();
    }
  }

  render() {
    const { player1, player2, turn, userInfo } = this.props;

    return (
      <>
        <Row style={{ marginBottom: '30px' }} justify="space-between">
          <Col lg={{ span: 6 }}>
            <ArrowLeftOutlined onClick={this.leaveRoom} className="font20" />
          </Col>
          <Col lg={{ span: 3 }} className="nav-set">
            <Text strong style={{ paddingRight: '10px' }}>
              {userInfo ? userInfo.username : ''}
            </Text>
          </Col>
        </Row>

        <Row>
          <Col
            lg={{ span: 6, order: 1 }}
            xs={{ span: 12, order: 1 }}
            sm={{ span: 12, order: 1 }}
            md={{ span: 12, order: 1 }}
          >
            <Player player={player1} turn={turn} />
          </Col>
          <Col
            lg={{ span: 12, order: 2 }}
            xs={{ span: 24, order: 3 }}
            sm={{ span: 24, order: 3 }}
            md={{ span: 24, order: 3 }}
          >
            <BoardGame memoryGame={memoryGame} />
          </Col>
          <Col
            lg={{ span: 6, order: 3 }}
            xs={{ span: 12, order: 2 }}
            sm={{ span: 12, order: 2 }}
            md={{ span: 12, order: 2 }}
          >
            <Player player={player2} turn={turn} />
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { player1, player2, turn } = state.player;
  return {
    player1,
    player2,
    turn,
    currentRoom: state.user.currentRoom,
    userInfo: state.user.info,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataOfCards: (dataOfCard) =>
      dispatch({ type: 'SET_DATA_OF_CARD', payload: { dataOfCard } }),
    setInfoOtherUser: (userInfo) =>
      dispatch({ type: 'SET_INFO_OF_OTHER_USER', payload: { userInfo } }),
    clearCurrentRoom: () => dispatch({ type: 'CLEAR_CURRENT_ROOM' }),
    setTurn: (turn) => dispatch({ type: 'SET_TURN', payload: { turn } }),
    clearBoardGame: () => dispatch({ type: 'CLEAR_BOARD_GAME' }),
    clearPlayer: () => dispatch({ type: 'CLEAR_PLAYER' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemoryGame);
