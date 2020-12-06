import {
  GET_POSTS,
  USER_LIKED_POSTS,
  USER_POSTS,
  LOAD_TIMELINE,
  GET_USER,
  GET_POST,
  CLEAR,
} from '../actions/types';

const initialState = {
  timeline: [],
  user_posts: [],
  user_liked_posts: [],
  post_user: null,
  error: null,
  post: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TIMELINE:
      return { ...state, loading: false, timeline: payload };
    case GET_POSTS:
      return { ...state, loading: false, posts: payload };
    case USER_POSTS:
      return { ...state, user_posts: payload, loading: false };
    case USER_LIKED_POSTS:
      return { ...state, user_liked_posts: payload, loading: false };
    case GET_USER:
      return { ...state, loading: false, post_user: payload };
    case GET_POST:
      return { ...state, loading: false, post: payload };
    case CLEAR:
      return {
        ...state,
        loading: true,

        user_posts: [],
        user_liked_posts: [],
        post: null,
      };
    default:
      return state;
  }
}
