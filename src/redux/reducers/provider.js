import {
  GET_PROVIDERS,
  GET_PROVIDERS_SUCCESS,
  GET_PROVIDERS_FAIL,
  CREATE_PROVIDER,
  CREATE_PROVIDER_SUCCESS,
  CREATE_PROVIDER_FAIL,
  MODIFY_PROVIDER,
  MODIFY_PROVIDER_SUCCESS,
  MODIFY_PROVIDER_FAIL,
  DELETE_PROVIDER,
  DELETE_PROVIDER_SUCCESS,
  DELETE_PROVIDER_FAIL
} from "../actions/provider";

export default function provider(
  state = { providers: [], isFetching: false, error: null, message: "" },
  action
) {
  switch (action.type) {
    case GET_PROVIDERS:
      return { ...state, isFetching: true };
    case CREATE_PROVIDER:
      return { ...state, isFetching: true };
    case MODIFY_PROVIDER:
      return { ...state, isFetching: true };
    case DELETE_PROVIDER:
      return { ...state, isFetching: true };

    case GET_PROVIDERS_SUCCESS:
      return { ...state, isFetching: false, providers: action.payload.provider };
    case CREATE_PROVIDER_SUCCESS:
      return { ...state, isFetching: false, providers: state.providers.concat(action.payload.provider) };
    case MODIFY_PROVIDER_SUCCESS:
      const array = state.providers.map(provider => {
        if (provider.id !== action.payload.provider.id) {
          return provider;
        }
        return { ...provider, ...action.payload.provider };
      });
      return { ...state, isFetching: false, providers: array };
    case DELETE_PROVIDER_SUCCESS:
      return { ...state, isFetching: false, providers: state.providers.filter(({ id }) => id !== action.payload.provider) };

    case GET_PROVIDERS_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };
    case CREATE_PROVIDER_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };
    case MODIFY_PROVIDER_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };
    case DELETE_PROVIDER_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };

    default:
      return state;
  }
}
