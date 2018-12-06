import {
  LOGOUT,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  MODIFY_USER,
  MODIFY_USER_SUCCESS,
  MODIFY_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from "../actions/user";

export default function user(
  state = { authedUser: null, isLoggedIn: false, users: [], isFetching: false, error: null },
  action
) {
  switch (action.type) {
    case LOGOUT:
      return { ...state, authedUser: null, isLoggedIn: false };
    case LOGIN:
      return { ...state, isFetching: true };
    case GET_USERS:
      return { ...state, isFetching: true };
    case CREATE_USER:
      return { ...state, isFetching: true };
    case MODIFY_USER:
      return { ...state, isFetching: true };
    case DELETE_USER:
      return { ...state, isFetching: true };

    case LOGIN_SUCCESS:
      return { ...state, isFetching: false, authedUser: action.user, isLoggedIn: true };
    case GET_USERS_SUCCESS:
      return { ...state, isFetching: false, users: action.users };
    case CREATE_USER_SUCCESS:
      return { ...state, isFetching: false, users: state.users.concat(action.user) };
    case MODIFY_USER_SUCCESS:
      const array = state.users.map(user => {
        if (user.id !== action.user.id) {
          return user;
        }
        return { ...user, ...action.user };
      });
      return { ...state, isFetching: false, users: array };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: state.users.filter(({ id }) => id !== action.id)
      };

    case LOGIN_FAIL:
      return { ...state, isFetching: false, error: action.error };
    case GET_USERS_FAIL:
      return { ...state, isFetching: false, error: action.error };
    case CREATE_USER_FAIL:
      return { ...state, isFetching: false, error: action.error };
    case MODIFY_USER_FAIL:
      return { ...state, isFetching: false, error: action.error };
    case DELETE_USER_FAIL:
      return { ...state, isFetching: false, error: action.error };

    default:
      return state;
  }
}
