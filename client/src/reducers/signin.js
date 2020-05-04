import * as types from './../constants/signin';

const tokenName = 'vyToken';
const vyToken = localStorage.getItem(tokenName);

const initialState = {
  token: vyToken ? vyToken : null,
  errorReq: null,
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_TOKEN': {
      localStorage.removeItem('vyToken');
      return {
        token: null,
        errorReq: null,
      };
    }
    case types.SIGN_OUT_REQUEST: {
      localStorage.removeItem(tokenName);

      return {
        ...state,
        token: null,
      };
    }

    case types.SIGN_IN_REQUEST: {
      return state;
    }

    case types.SIGN_IN_SUCCESSFUL: {
      const { token } = action.payload;
      localStorage.setItem(tokenName, token);
      return { ...state, token, errorReq: null };
    }

    case types.SIGN_IN_FAILED: {
      return {
        ...state,
        errorReq: { message: 'Username or password wrong!' },
      };
    }

    default: {
      return state;
    }
  }
};

export default signInReducer;
