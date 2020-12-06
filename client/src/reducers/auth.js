//import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import {
  REGISTER_SUCCESS,
  //REGISTER_FAIL,
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  ACCOUNT_DELETED,
  AUTH_ERROR,
  UPDATE_USER,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    default:
      return state;
  }
}
