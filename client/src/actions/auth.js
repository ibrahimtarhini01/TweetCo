import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  UPDATE_USER,
} from './types';
import api from '../utils/api';
import { setAlert } from './alert';
import { loadTimeline } from './post';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/users/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });

    dispatch(loadTimeline());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/auth/register', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    setTimeout(() => dispatch(loadUser()), 500);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  const body = { username, password };
  try {
    const res = await api.post('/auth/login', body);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Update User Details
export const updateUserInfo = (formData) => async (dispatch) => {
  try {
    const res = await api.put('/auth/updatedetails', formData);
    dispatch({ type: UPDATE_USER, payload: res.data.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};

// Update Profile Picture
export const updateProfilePic = (image) => async (dispatch) => {
  try {
    const res = await api.post('/auth/profileImage', image);
    await api.put('/post/avatar', { avatar: res.data.data });
    dispatch(loadUser());
    dispatch(loadTimeline());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};
// Update Profile Picture
export const updateBackgroundePic = (image) => async (dispatch) => {
  try {
    await api.post('/auth/backgroundImage', image);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};

export const follow = (username) => async (dispatch) => {
  try {
    const res = await api.put('/users/follow', { follow: username });
    dispatch({ type: UPDATE_USER, payload: res.data.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};

export const unfollow = (username) => async (dispatch) => {
  try {
    const res = await api.put('/users/unfollow', { unfollow: username });
    dispatch({ type: UPDATE_USER, payload: res.data.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};

// Logout
export const logout = () => async (dispatch) => {
  await api.get('/auth/logout');
  dispatch({ type: LOGOUT });
};
