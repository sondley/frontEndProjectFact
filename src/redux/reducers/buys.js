import {
  GET_BUYS,
  GET_BUYS_SUCCESS,
  GET_BUYS_FAIL,
  CREATE_BUY,
  CREATE_BUY_SUCCESS,
  CREATE_BUY_FAIL
} from "../actions/buys";

export default function buys(state = { buys: [], isFetching: false, error: null, message: "" }, action) {
  switch (action.type) {
    case GET_BUYS:
      return { ...state, isFetching: true };
    case CREATE_BUY:
      return { ...state, isFetching: true };

    case GET_BUYS_SUCCESS:
      return { ...state, isFetching: false, buys: action.payload.buy };
    case CREATE_BUY_SUCCESS:
      return { ...state, isFetching: false, buys: state.buys.concat(action.payload.buy) };

    case GET_BUYS_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };
    case CREATE_BUY_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };

    default:
      return state;
  }
}
