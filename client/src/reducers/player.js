import * as types from './../constants/player';

const vyToken = localStorage.getItem('vyToken');
let info;
if (vyToken) {
  info = JSON.parse(atob(vyToken.split('.')[1]));
}

const initialState = {
  player1: {
    name: 'default',
    username: vyToken ? info.username : '',
    elo: vyToken ? info.elo : 0,
    score: 0,
    numericalOrder: 1,
  },
  player2: {
    name: 'default',
    username: 'default',
    elo: 1300,
    score: 0,
    numericalOrder: 2,
  },
  turn: 1,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_PLAYER': {
      return Object.assign(
        {},
        {
          player1: {
            name: 'default',
            username: vyToken ? info.username : '',
            elo: vyToken ? info.elo : 0,
            score: 0,
            numericalOrder: 1,
          },
          player2: {
            name: 'default',
            username: 'default',
            elo: 1300,
            score: 0,
            numericalOrder: 2,
          },
          turn: 1,
        }
      );
    }
    case 'SET_INFO_OF_OTHER_USER': {
      const { userInfo } = action.payload;
      return {
        ...state,
        player2: {
          name: 'player2',
          username: userInfo.username,
          elo: userInfo.elo,
          score: 0,
          numericalOrder: 2,
        },
      };
    }
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

    case 'SET_TURN': {
      const { turn } = action.payload;

      return {
        ...state,
        turn,
      };
    }

    case 'SET_INFO_PLAYER1': {
      const vyToken = localStorage.getItem('vyToken');
      const user = JSON.parse(atob(vyToken.split('.')[1]));
      return {
        ...state,
        player1: {
          name: 'default',
          username: user.username,
          elo: user.elo,
          score: 0,
          numericalOrder: 1,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default playerReducer;
