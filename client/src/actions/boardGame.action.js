import * as actions from './../constants/boardGame.actionType';

export const selectFirstCard = (idCard) => {
  return {
    type: actions.SELECT_FIRST_CARD,
    payload: {
      idCard,
    },
  };
};

export const selectSecondCard = (idCard) => {
  return {
    type: actions.SELECT_SECOND_CARD,
    payload: {
      idCard,
    },
  };
};

export const addCardIntoSelected = (idCard1, idCard2) => {
  return {
    type: actions.ADD_CARD_INTO_SELECTED,
    payload: {
      idCard1,
      idCard2,
    },
  };
};
