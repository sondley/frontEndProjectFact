import {
  GET_SALES,
  GET_SALES_SUCCESS,
  GET_SALES_FAIL,
  CREATE_SALE,
  CREATE_SALE_SUCCESS,
  CREATE_SALE_FAIL
} from "../actions/sales";

export default function sales(state = { sales: [], isFetching: false, error: null, message: "" }, action) {
  switch (action.type) {
    case GET_SALES:
      return { ...state, isFetching: true };
    case CREATE_SALE:
      return { ...state, isFetching: true };

    case GET_SALES_SUCCESS:
      return { ...state, isFetching: false, sales: action.payload.sale };
    case CREATE_SALE_SUCCESS:
      return { ...state, isFetching: false, sales: state.sales.concat(action.payload.sale) };

    case GET_SALES_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };
    case CREATE_SALE_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };

    default:
      return state;
  }
}
