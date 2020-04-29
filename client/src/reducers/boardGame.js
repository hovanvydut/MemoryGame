import * as types from './../constants/boardGame.actionType';

const dataOfCard = [
  {
    id: 1,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
    match: 19,
  },
  {
    id: 2,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png',
    match: 20,
  },
  {
    id: 3,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png',
    match: 21,
  },
  {
    id: 4,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
    match: 22,
  },
  {
    id: 5,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png',
    match: 23,
  },
  {
    id: 6,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png',
    match: 24,
  },
  {
    id: 7,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
    match: 25,
  },
  {
    id: 8,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/008.png',
    match: 26,
  },
  {
    id: 9,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png',
    match: 27,
  },
  {
    id: 10,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png',
    match: 28,
  },
  {
    id: 11,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/011.png',
    match: 29,
  },
  {
    id: 12,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/012.png',
    match: 30,
  },
  {
    id: 13,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png',
    match: 31,
  },
  {
    id: 14,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/014.png',
    match: 32,
  },
  {
    id: 15,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/015.png',
    match: 33,
  },
  {
    id: 16,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png',
    match: 34,
  },
  {
    id: 17,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/017.png',
    match: 35,
  },
  {
    id: 18,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/018.png',
    match: 36,
  },
  {
    id: 19,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
    match: 1,
  },
  {
    id: 20,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png',
    match: 2,
  },
  {
    id: 21,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png',
    match: 3,
  },
  {
    id: 22,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
    match: 4,
  },
  {
    id: 23,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png',
    match: 5,
  },
  {
    id: 24,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png',
    match: 6,
  },
  {
    id: 25,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
    match: 7,
  },
  {
    id: 26,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/008.png',
    match: 8,
  },
  {
    id: 27,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png',
    match: 9,
  },
  {
    id: 28,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png',
    match: 10,
  },
  {
    id: 29,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/011.png',
    match: 11,
  },
  {
    id: 30,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/012.png',
    match: 12,
  },
  {
    id: 31,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png',
    match: 13,
  },
  {
    id: 32,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/014.png',
    match: 14,
  },
  {
    id: 33,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/015.png',
    match: 15,
  },
  {
    id: 34,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png',
    match: 16,
  },
  {
    id: 35,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/017.png',
    match: 17,
  },
  {
    id: 36,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/018.png',
    match: 18,
  },
];

const initialState = {
  dataOfCard,
  idFirstCard: false,
  idSecondCard: false,
  selected: [],
};

const boardGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA_OF_CARD_SUCCESS': {
      return state;
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
