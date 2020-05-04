import * as signUpTypes from './../constants/signup';
import { signUpSuccess, signUpFail } from './../actions/signUp';
import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import * as config from './../constants/config';

const HOST = `${config.HOST}`;

function* registerNewAccount(action) {
  const { username, password } = action.payload;
  try {
    const response = yield axios.post(`${HOST}/api/v1/signup`, {
      username,
      password,
    });
    yield put(signUpSuccess(response.data.message));
  } catch (error) {
    yield put(signUpFail(error.message));
  }
}

function* signUpStart() {
  yield takeLatest(signUpTypes.SIGN_UP_REQUEST, registerNewAccount);
}

export default signUpStart;
