//import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import {
  SEARCH_USERS,
  GET_FOLLOWERS,
  SEARCHING,
  GET_FOLLOWING,
  CLEAR,
} from '../actions/types';

const initialState = {
  searching: false,
  loading: true,
  users: [],
  followers: [],
  following: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCHING:
      return { ...state, searching: payload };
    case SEARCH_USERS:
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        loading: false,
        followers: [payload, ...state.followers],
      };
    case GET_FOLLOWING:
      return {
        ...state,
        loading: false,
        following: [payload, ...state.following],
      };
    case CLEAR:
      return {
        ...state,
        loading: true,
        users: [],
        followers: [],
        following: [],
      };
    default:
      return state;
  }
}
