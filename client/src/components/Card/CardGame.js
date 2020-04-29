import React, { Component } from 'react';
import { Col, Card } from 'antd';

class CardGame extends Component {
  render() {
    const { hiddenCard, openCard, firstCard, secondCard, card } = this.props;
    return (
      <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={hiddenCard(card)} onClick={() => openCard(card)}>
          <Card
            className={
              firstCard === card.id || secondCard === card.id
                ? 'flip-card-inner flip-card-inner--hover'
                : 'flip-card-inner'
            }
            hoverable
            cover={
              <>
                <img className="flip-card-back" alt="pokemon" src={card.img} />
                <div className="flip-card-front" />
              </>
            }
          />
        </div>
      </Col>
    );
  }
}

export default CardGame;
