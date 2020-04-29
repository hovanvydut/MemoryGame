import * as types from './../constants/boardGame.actionType';

export const selectFirstCard = (idCard) => {
  return {
    type: types.SELECT_FIRST_CARD,
    payload: {
      idCard,
    },
  };
};

export const selectSecondCard = (idCard) => {
  return {
    type: types.SELECT_SECOND_CARD,
    payload: {
      idCard,
    },
  };
};

export const addCardIntoSelected = (idCard1, idCard2) => {
  return {
    type: types.ADD_CARD_INTO_SELECTED,
    payload: {
      idCard1,
      idCard2,
    },
  };
};
