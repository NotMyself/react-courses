// import { take, call, put, select } from 'redux-saga/effects';
import { REQUEST_TOPICS, SELECT_TOPIC } from './constants';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { requestTopicsSucceeded, requestTopicsFailed } from './actions';
import { push } from 'react-router-redux';

export function fetchTopicsFromServer() {
  return fetch('http://localhost:3000/api/topics/')
    .then(res => res.json());
}

function* fetchTopics() {
  try {
    const topics = yield call(fetchTopicsFromServer);
    yield put(requestTopicsSucceeded(topics));
  } catch (e) {
    yield put(requestTopicsFailed(e.message));
  }
}

function* pushTopic(action) {
  yield put(push(`/topics/${action.topic.name}`));
}

export function* selectTopicSaga() {
  yield* takeLatest(SELECT_TOPIC, pushTopic);
}

// Individual exports for testing
export function* fetchTopicSaga() {
  yield* takeLatest(REQUEST_TOPICS, fetchTopics);
}

// All sagas to be loaded
export default [
  fetchTopicSaga,
  selectTopicSaga,
];
