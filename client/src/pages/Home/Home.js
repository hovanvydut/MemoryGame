import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

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
      return history.push(`/memorygame/${currentRoom}`);
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

  createRoom = () => {
    const { createdRoomName } = this.state;
    const { userInfo, setCurrentRoom, clearCurrentRoom } = this.props;
    setCurrentRoom(createdRoomName);
    memoryGame.emit(
      'create-room-memorygame',
      { roomName: createdRoomName, userInfo },
      (error) => {
        if (error) {
          clearCurrentRoom();
          alert(error.message);
        } else {
          this.props.history.push(`/memorygame/${createdRoomName}`);
        }
      }
    );
  };

  componentWillUnmount() {
    if (home) {
      home.off('online-user-count');
    }
    if (memoryGame) {
      memoryGame.off('list-room');
    }
    memoryGame.close();
  }

  joinRoom = () => {
    const { joinRoomName } = this.state;
    const { setCurrentRoom, history } = this.props;
    setCurrentRoom(joinRoomName);
    setTimeout(() => {
      history.push(`/memorygame/${joinRoomName}`);
    }, 200);
  };

  render() {
    const {
      onlineUserCount,
      joinRoomName,
      createdRoomName,
      listRoom,
    } = this.state;
    return (
      <>
        <div>online user: {onlineUserCount}</div>
        <input
          type="text"
          placeholder="new room"
          value={createdRoomName}
          onChange={(e) => this.setState({ createdRoomName: e.target.value })}
        ></input>
        <button onClick={this.createRoom}>New room</button>
        <br />
        <input
          type="text"
          placeholder="room name"
          value={joinRoomName}
          onChange={(e) => this.setState({ joinRoomName: e.target.value })}
        ></input>
        <button onClick={this.joinRoom}>join room</button>
        <ul>
          {listRoom.map((room, idx) => (
            <li key={idx}>{room}</li>
          ))}
        </ul>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
