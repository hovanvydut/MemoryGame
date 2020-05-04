import * as signInTypes from './../constants/signin';
import { signInSuccess, signInFail } from './../actions/signIn';
import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import * as config from './../constants/config';

const HOST = `${config.HOST}`;

function* loginFlow(action) {
  const { username, password } = action.payload;

  try {
    const response = yield axios.post(`${HOST}/api/v1/signin`, {
      username,
      password,
    });
    yield put(signInSuccess(response.data.token));
    yield put({ type: 'SET_USER_INFO' });
    yield put({ type: 'SET_INFO_PLAYER1' });
  } catch (error) {
    yield put(signInFail(error.message));
  }
}

function* signInStart() {
  yield takeLatest(signInTypes.SIGN_IN_REQUEST, loginFlow);
}

export default signInStart;
