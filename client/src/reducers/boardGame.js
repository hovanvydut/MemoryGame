import * as types from './../constants/boardGame';

const initialState = {
  dataOfCard: [],
  idFirstCard: false,
  idSecondCard: false,
  selected: [],
  win: false,
};

const boardGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_OF_CARD': {
      const { dataOfCard } = action.payload;
      return { ...state, dataOfCard };
    }
    case 'CLEAR_BOARD_GAME': {
      return { ...initialState };
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
      if (state.selected.length === 34) {
        return {
          ...state,
          selected: [...state.selected, idCard1, idCard2],
          win: true,
        };
      } else {
        return {
          ...state,
          selected: [...state.selected, idCard1, idCard2],
        };
      }
    }
    default: {
      return state;
    }
  }
};

export default boardGameReducer;
