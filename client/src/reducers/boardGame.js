import * as types from './../constants/boardGame';

const initialState = {
  dataOfCard: [],
  idFirstCard: false,
  idSecondCard: false,
  selected: [],
};

const boardGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_OF_CARD': {
      const { dataOfCard } = action.payload;
      return { ...state, dataOfCard };
    }
    case types.SELECT_FIRST_CARD: {
      const { idCard } = action.payload;
      return {
        ...state,
        idFirstCard: idCard,
      };
    }
    case types.SELECT_SECOND_CARD: {
      const { idCard } = action.payload;
      return {
        ...state,
        idSecondCard: idCard,
      };
    }
    case types.ADD_CARD_INTO_SELECTED: {
      const { idCard1, idCard2 } = action.payload;

      return {
        ...state,
        selected: [...state.selected, idCard1, idCard2],
      };
    }
    default: {
      return state;
    }
  }
};

export default boardGameReducer;
