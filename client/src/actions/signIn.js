import * as types from './../constants/signin';

export const signOutRequest = () => {
  return {
    type: types.SIGN_OUT_REQUEST,
  };
};

export const signInRequest = (username, password) => {
  return {
    type: types.SIGN_IN_REQUEST,
    payload: {
      username,
      password,
    },
  };
};

export const signInSuccess = (token) => {
  return {
    type: types.SIGN_IN_SUCCESSFUL,
    payload: {
      token,
    },
  };
};

export const signInFail = (message) => {
  return {
    type: types.SIGN_IN_FAILED,
    payload: {
      message,
    },
  };
};
