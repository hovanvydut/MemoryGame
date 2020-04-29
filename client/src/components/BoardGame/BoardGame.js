import React, { Component } from 'react';
import { Row } from 'antd';
import CardGame from '../Card/CardGame';
import { connect } from 'react-redux';
import * as BoardGameActionCreator from './../../actions/boardGame.action';

class BoardGame extends Component {
  openCard = (card) => {
    const {
      idFirstCard,
      idSecondCard,
      selectFirstCard,
      selectSecondCard,
      addCardIntoSelected,
    } = this.props;

    if (idFirstCard === false) selectFirstCard(card.id);
    else if (idSecondCard === false && card.id !== idFirstCard) {
      selectSecondCard(card.id);

      if (card.match === idFirstCard)
        setTimeout(() => addCardIntoSelected(card.id, idFirstCard), 500);

      setTimeout(() => {
        selectFirstCard(false);
        selectSecondCard(false);
      }, 1000);
    }
  };

  hiddenCard = (card) => {
    const { selected } = this.props;

    let idx = selected.findIndex((id) => id === card.id);

    if (idx > -1) return 'flip-card card-hidden';
    return 'flip-card';
  };

  render() {
    const { dataOfCard, idFirstCard, idSecondCard } = this.props;

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardGame);
