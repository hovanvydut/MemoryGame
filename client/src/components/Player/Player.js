import React, { Component } from 'react';
import { Avatar } from 'antd';
import './Player.css';

class Player extends Component {
  render() {
    const { player, turn } = this.props;
    return (
      <div className="w100 h100 center">
        <div className="center">
          <Avatar className="bgPink verticalMiddle" size="large">
            {player.name.trim().split(' ').slice(-1)[0]}
          </Avatar>
          {player.username}
          {player.score}
          {turn === player.numericalOrder ? '*' : ''}
        </div>
      </div>
    );
  }
}

export default Player;
