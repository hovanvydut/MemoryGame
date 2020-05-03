import { all, fork } from 'redux-saga/effects';
import signUpStart from './signUp';
import signInStart from './signIn';

function* rootSaga() {
  yield all([fork(signUpStart), fork(signInStart)]);
}

export default rootSaga;
