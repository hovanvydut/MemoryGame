import * as types from './../constants/player.actionType';

const initialState = {
  player1: {
    name: 'Ho Van Vy',
    username: 'hovanvydut',
    elo: 1200,
    score: 0,
    numericalOrder: 1,
  },
  player2: {
    name: 'Nguyen Thanh Tung',
    username: 'nguyenthanhtung',
    elo: 1300,
    score: 0,
    numericalOrder: 2,
  },
  turn: 1,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_TURN: {
      const turn = state.turn === 1 ? 2 : 1;
      return { ...state, turn };
    }

    case types.PLUS_SCORE: {
      const { point } = action.payload;
      const { turn, player1, player2 } = state;
      if (turn === 1) player1.score += point;
      else player2.score += point;

      return {
        ...state,
        player1: { ...player1 },
        player2: { ...player2 },
      };
    }

    default: {
      return state;
    }
  }
};

export default playerReducer;
