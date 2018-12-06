import {
GET_CATEGORIES,
GET_CATEGORIES_SUCCESS,
GET_CATEGORIES_FAIL,
CREATE_CATEGORY,
CREATE_CATEGORY_SUCCESS,
CREATE_CATEGORY_FAIL,
MODIFY_CATEGORY,
MODIFY_CATEGORY_SUCCESS,
MODIFY_CATEGORY_FAIL,
DELETE_CATEGORY,
DELETE_CATEGORY_SUCCESS,
DELETE_CATEGORY_FAIL
} from "../actions/category";

export default function category(
  state = { categories: [], isFetching: false, error: null },
  action
) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, isFetching: true };
    case CREATE_CATEGORY:
      return { ...state, isFetching: true };
    case MODIFY_CATEGORY:
      return { ...state, isFetching: true };
    case DELETE_CATEGORY:
      return { ...state, isFetching: true };

    case GET_CATEGORIES_SUCCESS:
      return { ...state, isFetching: false, categories: action.categories };
    case CREATE_CATEGORY_SUCCESS:
      return { ...state, isFetching: false, categories: state.categories.concat(action.category) };
    case MODIFY_CATEGORY_SUCCESS:
      const array = state.categories.map(category => {
        if (category.id !== action.category.id) { return category; }
        return { ...category, ...action.category };
      });
      return { ...state, isFetching: false, categories: array };
    case DELETE_CATEGORY_SUCCESS:
      return { ...state, isFetching: false, categories: state.categories.filter(({ id }) => id !== action.id) };

    case GET_CATEGORIES_FAIL:
      return { ...state, isFetching: false, error: action.error };
    case CREATE_CATEGORY_FAIL:
      return { ...state, isFetching: false, error: action.error };
    case MODIFY_CATEGORY_FAIL:
      return { ...state, isFetching: false, error: action.error };
    case DELETE_CATEGORY_FAIL:
      return { ...state, isFetching: false, error: action.error };

    default:
      return state;
  }
}
