import * as types from './../constants/player.actionType';

export const changeTurn = () => {
  return {
    type: types.CHANGE_TURN,
  };
};

export const plusScore = (point = 1) => {
  return {
    type: types.PLUS_SCORE,
    payload: {
      point: point,
    },
  };
};
