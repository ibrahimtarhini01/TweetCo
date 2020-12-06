import {
  USER_POSTS,
  USER_LIKED_POSTS,
  LOAD_TIMELINE,
  GET_USER,
  CLEAR,
  GET_POST,
} from './types';
import api from '../utils/api';
import { setAlert } from './alert';
import { loadUser } from './auth';

// Load Timeline
export const loadTimeline = () => async (dispatch) => {
  try {
    const res = await api.get('/post/timeline');
    dispatch({ type: LOAD_TIMELINE, payload: res.data.data });
  } catch (err) {
    console.error(err.response.data.errors);
  }
};

// Add Post
export const addPost = (data) => async (dispatch) => {
  try {
    await api.post('/post', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(loadTimeline());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(1);
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
  }
};

export const getUser = (username) => async (dispatch) => {
  try {
    const user = await api.get(`/users/${username}`);
    dispatch({ type: GET_USER, payload: user.data.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};

export const clear = () => (dispatch) => {
  dispatch({ type: CLEAR });
};

export const like = (id, username) => async (dispatch) => {
  try {
    await api.put(`/post/${id}/like`);
    dispatch(loadTimeline());
    dispatch(getUserPost(username));
    dispatch(getUserLikedPost(username));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};

export const unlike = (id, username) => async (dispatch) => {
  try {
    await api.put(`/post/${id}/unlike`);
    dispatch(loadTimeline());
    dispatch(getUserPost(username));
    dispatch(getUserLikedPost(username));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};

export const editPost = (formData, id) => async (dispatch) => {
  try {
    await api.put(`/post/${id}`, formData);
    dispatch(loadUser);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/post/${id}`);
    dispatch(loadUser);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/post/search/${id}`);
    dispatch({ type: GET_POST, payload: res.data.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};

export const getUserPost = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/post/${username}`);
    dispatch({ type: USER_POSTS, payload: res.data.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};
export const getUserLikedPost = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/post/${username}/like`);
    dispatch({ type: USER_LIKED_POSTS, payload: res.data.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};

export const comment = (postId, formData) => async (dispatch) => {
  try {
    await api.post(`/post/comment/${postId}`, formData, {
      'Content-Type': 'Application/json',
    });
    dispatch(getPost(postId));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/post/comment/${postId}/${commentId}`);
    dispatch(getPost(postId));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'red')));
    }
    console.log(errors);
  }
};
