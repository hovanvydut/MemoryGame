import React, { Component } from 'react';
import io from 'socket.io-client';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import BoardGame from './../../components/BoardGame/BoardGame';
import Player from './../../components/Player/Player';
import './MemoryGame.css';

const MEMORY_GAME_SOCKET_HOST = 'http://localhost:3001/memorygame';
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
          this.props.history.push('/');
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
      history.push('/');
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
    history.push('/');
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
    const { player1, player2, turn } = this.props;

    return (
      <>
        <Row className="w100vw h100vh">
          <Col span={6}>
            <button onClick={this.leaveRoom}>Leave</button>
            <Player player={player1} turn={turn} />
          </Col>
          <Col span={12}>
            <BoardGame memoryGame={memoryGame} />
          </Col>
          <Col span={6}>
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
