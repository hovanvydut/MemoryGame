import React, { Component } from 'react';
import { Row } from 'antd';
import CardGame from '../Card/CardGame';
import { connect } from 'react-redux';
import * as BoardGameActionCreator from './../../actions/boardGame';
import * as PlayerActionCreator from './../../actions/player';

class BoardGame extends Component {
  componentDidMount() {
    const {
      memoryGame,
      selectFirstCard,
      selectSecondCard,
      addCardIntoSelected,
      plusScore,
      changeTurn,
    } = this.props;

    memoryGame.on('response-select-first-card-to-other-user', (cardId) => {
      selectFirstCard(cardId);
    });
    memoryGame.on('response-select-second-card-to-other-user', (cardId) => {
      selectSecondCard(cardId);
    });
    memoryGame.on('response-add-card-into-selected', (cardId1, cardId2) => {
      addCardIntoSelected(cardId1, cardId2);
    });
    memoryGame.on('response-plus-score', (point) => {
      plusScore(1);
    });
    memoryGame.on('response-change-turn', () => {
      changeTurn();
    });
  }

  openCard = (card) => {
    const {
      idFirstCard,
      idSecondCard,
      selectFirstCard,
      selectSecondCard,
      addCardIntoSelected,
      changeTurn,
      plusScore,
      memoryGame,
      currentRoom,
      turn,
    } = this.props;

    if (turn !== 1) return;
    if (idFirstCard === false) {
      selectFirstCard(card.id);
      memoryGame.emit('select-first-card', card.id, currentRoom);
    } else if (idSecondCard === false && card.id !== idFirstCard) {
      selectSecondCard(card.id);
      memoryGame.emit('select-second-card', card.id, currentRoom);

      if (card.match === idFirstCard) {
        setTimeout(() => {
          addCardIntoSelected(card.id, idFirstCard);
          memoryGame.emit(
            'add-card-into-selected',
            card.id,
            idFirstCard,
            currentRoom
          );
          plusScore(1);
          memoryGame.emit('plus-score', 1, currentRoom);
        }, 500);
      } else {
        setTimeout(() => {
          memoryGame.emit('change-turn', currentRoom);
          changeTurn();
        }, 1000);
      }

      setTimeout(() => {
        selectFirstCard(false);
        memoryGame.emit('select-first-card', false, currentRoom);
        selectSecondCard(false);
        memoryGame.emit('select-second-card', false, currentRoom);
      }, 1000);
    }
  };

  hiddenCard = (card) => {
    const { selected } = this.props;
    let idx = selected.findIndex((id) => id === card.id);

    if (idx > -1) return 'flip-card card-hidden';
    return 'flip-card';
  };
  handleWin = () => {
    const { userInfo, currentRoom, memoryGame } = this.props;
    memoryGame.emit('win', userInfo, currentRoom);
  };

  render() {
    const { dataOfCard, idFirstCard, idSecondCard, win } = this.props;
    if (win) {
      this.handleWin();
    }
    return (
      <Row gutter={16}>
        {dataOfCard.map((card, idx) => {
          return (
            <CardGame
              key={idx}
              hiddenCard={this.hiddenCard}
              openCard={this.openCard}
              firstCard={idFirstCard}
              secondCard={idSecondCard}
              card={card}
            />
          );
        })}
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataOfCard: state.boardGame.dataOfCard,
    idFirstCard: state.boardGame.idFirstCard,
    idSecondCard: state.boardGame.idSecondCard,
    selected: state.boardGame.selected,
    currentRoom: state.user.currentRoom,
    turn: state.player.turn,
    player1: state.player.player1,
    userInfo: state.user.info,
    player2: state.player.player2,
    win: state.boardGame.win,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectFirstCard: (idCard) =>
      dispatch(BoardGameActionCreator.selectFirstCard(idCard)),
    selectSecondCard: (idCard) =>
      dispatch(BoardGameActionCreator.selectSecondCard(idCard)),
    addCardIntoSelected: (idCard1, idCard2) =>
      dispatch(BoardGameActionCreator.addCardIntoSelected(idCard1, idCard2)),
    changeTurn: () => dispatch(PlayerActionCreator.changeTurn()),
    plusScore: (score) => dispatch(PlayerActionCreator.plusScore(score)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardGame);
