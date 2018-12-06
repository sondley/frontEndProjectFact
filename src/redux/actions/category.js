import api from "../../api";

export const GET_CATEGORIES = "GET_CATEGORYS";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAIL = "GET_CATEGORIES_FAIL";
export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_FAIL = "CREATE_CATEGORY_FAIL";
export const MODIFY_CATEGORY = "MODIFY_CATEGORY";
export const MODIFY_CATEGORY_SUCCESS = "MODIFY_CATEGORY_SUCCESS";
export const MODIFY_CATEGORY_FAIL = "MODIFY_CATEGORY_FAIL";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_FAIL = "DELETE_CATEGORY_FAIL";

function getCategoriesBegin() {
  return { type: GET_CATEGORIES };
}

function getCategoriesSuccess(categories) {
  return { type: GET_CATEGORIES_SUCCESS, categories };
}

function getCategoriesFail(error) {
  return { type: GET_CATEGORIES_FAIL, error };
}

function createCategoryBegin() {
  return { type: CREATE_CATEGORY };
}

function createCategorySuccess(category) {
  return { type: CREATE_CATEGORY_SUCCESS, category };
}

function createCategoryFail(error) {
  return { type: CREATE_CATEGORY_FAIL, error };
}

function modifyCategoryBegin() {
  return { type: MODIFY_CATEGORY };
}

function modifyCategorySuccess(category) {
  return { type: MODIFY_CATEGORY_SUCCESS, category };
}

function modifyCategoryFail(error) {
  return { type: MODIFY_CATEGORY_FAIL, error };
}

function deleteCategoryBegin() {
  return { type: DELETE_CATEGORY };
}

function deleteCategorySuccess(id) {
  return { type: DELETE_CATEGORY_SUCCESS, id };
}

function deleteCategoryFail(error) {
  return { type: DELETE_CATEGORY_FAIL, error };
}

export function getCategories() {
  return dispatch => {
    dispatch(getCategoriesBegin());
    return api
      .requestGET("/categorias")
      .then(objResponse => {
        dispatch(getCategoriesSuccess(objResponse.data.results));
      })
      .catch(objError => {
        dispatch(getCategoriesFail(objError));
      });
  };
}

export function createCategory(category, onClose) {
  return dispatch => {
    dispatch(createCategoryBegin());
    return api
      .requestPOST("/categorias", { categoria: category.categoria })
      .then(objResponse => {
        dispatch(createCategorySuccess(objResponse.data));
        onClose();
      })
      .catch(objError => {
        dispatch(createCategoryFail(objError));
      });
  };
}

export function modifyCategory(category, onClose) {
  return dispatch => {
    dispatch(modifyCategoryBegin());
    return api
      .requestPUT(`/categorias/${category.id}`, {
        categoria: category.categoria,
        estado: category.estado
      })
      .then(objResponse => {
        console.log(objResponse);
        dispatch(modifyCategorySuccess(category));
        onClose();
      })
      .catch(objError => {
        dispatch(modifyCategoryFail(objError));
      });
  };
}

export function deleteCategory(id, onClose) {
  return dispatch => {
    dispatch(deleteCategoryBegin());
    return api
      .requestDELETE(`/categorias/${id.id}`)
      .then(objResponse => {
        console.log(objResponse);
        dispatch(deleteCategorySuccess(id.id));
        onClose();
      })
      .catch(objError => {
        dispatch(deleteCategoryFail(objError));
      });
  };
}
