import * as types from './../constants/signup';
const initialState = {
  successReq: null,
  errorReq: null,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_REQUEST: {
      return state;
    }
    case types.SIGN_UP_SUCCESSFUL: {
      const { message } = action.payload;
      return { ...state, successReq: { message }, errorReq: null };
    }
    case types.SIGN_UP_FAILED: {
      return {
        ...state,
        successReq: null,
        errorReq: { message: 'Username taken!' },
      };
    }
    default: {
      return state;
    }
  }
};

export default signUpReducer;
