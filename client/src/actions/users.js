import {
  SEARCHING,
  SEARCH_USERS,
  GET_FOLLOWERS,
  CLEAR,
  GET_FOLLOWING,
} from './types';
import api from '../utils/api';

export const toggleSearch = (searching) => (dispatch) => {
  dispatch({ type: SEARCHING, payload: searching });
};

// HANDLE ERRORS
export const searchUsers = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/users/search/${username}`);
    dispatch({ type: SEARCH_USERS, payload: res.data.data });
  } catch (err) {
    console.log(err.response);
  }
};

// HANDLE ERRORS
export const getFollowers = (usernames) => async (dispatch) => {
  try {
    usernames.forEach(async (username) => {
      const res = await api.get(`/users/${username}`);
      dispatch({ type: GET_FOLLOWERS, payload: res.data.data });
    });
  } catch (err) {
    console.log(err.response);
  }
};

// HANDLE ERRORS
export const getFollowing = (usernames) => async (dispatch) => {
  try {
    usernames.forEach(async (username) => {
      const res = await api.get(`/users/${username}`);
      dispatch({ type: GET_FOLLOWING, payload: res.data.data });
    });
  } catch (err) {
    console.log(err.response);
  }
};

export const clear = () => (dispatch) => {
  dispatch({ type: CLEAR });
};
