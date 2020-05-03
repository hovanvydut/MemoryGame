import * as types from './../constants/signup';

export const signUpRequest = (username, password) => {
  return {
    type: types.SIGN_UP_REQUEST,
    payload: {
      username,
      password,
    },
  };
};

export const signUpSuccess = (message) => {
  return {
    type: types.SIGN_UP_SUCCESSFUL,
    payload: {
      message,
    },
  };
};

export const signUpFail = (message) => {
  return {
    type: types.SIGN_UP_FAILED,
    payload: {
      message,
    },
  };
};
