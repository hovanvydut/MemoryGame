import React, { Component } from 'react';
import { Avatar } from 'antd';
import './Player.css';

class Player extends Component {
  render() {
    const { player, turn } = this.props;
    return (
      <div className="w100 h100 center">
        <div className="center">
          <span className={turn === player.numericalOrder ? 'myTurn' : ''}>
            {player.username}
          </span>
          <span className="mleft-20">{player.score}</span>
        </div>
      </div>
    );
  }
}

export default Player;
