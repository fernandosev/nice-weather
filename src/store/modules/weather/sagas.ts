import {takeLatest, call, put, all} from 'redux-saga/effects';

import {api} from '~/services/api';

import {testRequest, testSuccess, testFailure} from './slice';

import {ResponseGenerator} from './types';

export function* test({
  payload,
}: {
  payload: {
    prop1: string;
    callbackFunction: (
      messageType: 'success' | 'error',
      messageText: string,
    ) => void;
  };
}) {
  const {
    prop1,
    callbackFunction,
  }: {
    prop1?: string;
    callbackFunction: (
      messageType: 'success' | 'error',
      messageText: string,
    ) => void;
  } = payload;

  console.log(prop1);

  try {
    const response: ResponseGenerator = yield call(api.post, '/test2', {
      prop1,
    });

    const data = response.data;

    console.log(data);

    yield put(testSuccess());
    yield callbackFunction('success', '');
  } catch (err: any) {
    yield put(testFailure());

    if (err.response?.data?.error_msg) {
      yield callbackFunction('error', err.response.data.error_msg);
    } else {
      yield callbackFunction('error', 'Server error. Try again later.');
    }
  }
}

export default all([takeLatest(testRequest, test)]);
