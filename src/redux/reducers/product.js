import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  MODIFY_PRODUCT,
  MODIFY_PRODUCT_SUCCESS,
  MODIFY_PRODUCT_FAIL,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL
} from "../actions/product";

export default function product(
  state = { products: [], isFetching: false, error: null, message: "" },
  action
) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, isFetching: true };
    case CREATE_PRODUCT:
      return { ...state, isFetching: true };
    case MODIFY_PRODUCT:
      return { ...state, isFetching: true };
    case DELETE_PRODUCT:
      return { ...state, isFetching: true };

    case GET_PRODUCTS_SUCCESS:
      return { ...state, isFetching: false, products: action.payload.product };
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, isFetching: false, products: state.products.concat(action.payload.product) };
    case MODIFY_PRODUCT_SUCCESS:
      const array = state.products.map(product => {
        if (product.id !== action.payload.product.id) {
          return product;
        }
        return { ...product, ...action.payload.product };
      });
      return { ...state, isFetching: false, products: array };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        products: state.products.filter(({ id }) => id !== action.payload.product)
      };

    case GET_PRODUCTS_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };
    case CREATE_PRODUCT_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };
    case MODIFY_PRODUCT_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };
    case DELETE_PRODUCT_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };

    default:
      return state;
  }
}
