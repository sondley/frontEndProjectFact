import {
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAIL,
  CREATE_CLIENT,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_FAIL,
  MODIFY_CLIENT,
  MODIFY_CLIENT_SUCCESS,
  MODIFY_CLIENT_FAIL,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL
} from "../actions/client";

export default function client(
  state = { clients: [], isFetching: false, error: null, message:"" },
  action
) {
  switch (action.type) {
    case GET_CLIENTS:
      return { ...state, isFetching: true };
    case CREATE_CLIENT:
      return { ...state, isFetching: true };
    case MODIFY_CLIENT:
      return { ...state, isFetching: true };
    case DELETE_CLIENT:
      return { ...state, isFetching: true };

    case GET_CLIENTS_SUCCESS:
      return { ...state, isFetching: false, clients: action.payload.client };
    case CREATE_CLIENT_SUCCESS:
      return { ...state, isFetching: false, clients: state.clients.concat(action.payload.client) };
    case MODIFY_CLIENT_SUCCESS:
      const array = state.clients.map(client => {
        if (client.id !== action.payload.client.id) {
          return client;
        }
        return { ...client, ...action.payload.client };
      });
      return { ...state, isFetching: false, clients: array };
    case DELETE_CLIENT_SUCCESS:
      return { ...state, isFetching: false, clients: state.clients.filter(({ id }) => id !== action.payload.client) };

    case GET_CLIENTS_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };
    case CREATE_CLIENT_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };
    case MODIFY_CLIENT_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };
    case DELETE_CLIENT_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };

    default:
      return state;
  }
}
