import { takeLatest } from 'redux-saga/effects';

function* tmpSaga() {}

function* rootSaga() {
  takeLatest('NOT_FOUND', tmpSaga);
}

export default rootSaga;
