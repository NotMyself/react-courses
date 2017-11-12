/*
 *
 * LinkFormContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
} from './constants';

const initialState = fromJS({});

function linkFormContainerReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default linkFormContainerReducer;
