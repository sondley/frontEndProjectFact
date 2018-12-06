import api from "../../api";
import { getCategories } from "./category";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAIL = "CREATE_PRODUCT_FAIL";
export const MODIFY_PRODUCT = "MODIFY_PRODUCT";
export const MODIFY_PRODUCT_SUCCESS = "MODIFY_PRODUCT_SUCCESS";
export const MODIFY_PRODUCT_FAIL = "MODIFY_PRODUCT_FAIL";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAIL = "DELETE_PRODUCT_FAIL";

function requestBegin(type) {
  return { type };
}

function requestSuccess(type, product, message) {
  return { type, payload: { product, message } };
}

function requestFail(type, message) {
  return { type, payload: { message } };
}

export function getProducts() {
  return dispatch => {
    dispatch(getCategories());
    dispatch(requestBegin(GET_PRODUCTS));
    return api
      .requestGET("/productos")
      .then(objResponse => {
        dispatch(requestSuccess(GET_PRODUCTS_SUCCESS, objResponse.data.results));
      })
      .catch(objError => {
        dispatch(requestFail(GET_PRODUCTS_FAIL, objError));
      });
  };
}

export function createProduct(product, onClose) {
  return dispatch => {
    dispatch(requestBegin(CREATE_PRODUCT));
    return api
      .requestPOST("/productos", {
        producto: product.producto,
        presentacion: product.presentacion,
        categoria_id: product.categoria_id,
        unidad: product.unidad,
        moneda: product.moneda,
        stock: product.stock,
        precio_compra: product.precio_compra,
        precio_venta: product.precio_venta,
        imagen: product.imagen,
        codigo_b: product.codigo_b
      })
      .then(objResponse => {
        dispatch(requestSuccess(CREATE_PRODUCT_SUCCESS, objResponse.data));
        onClose();
      })
      .catch(objError => {
        dispatch(requestFail(CREATE_PRODUCT_FAIL, objError));
      });
  };
}

export function modifyProduct(product, onClose) {
  return dispatch => {
    dispatch(requestBegin(MODIFY_PRODUCT));
    return api
      .requestPUT(`/productos/${product.id}`, {
        producto: product.producto,
        presentacion: product.presentacion,
        categoria_id: product.categoria_id,
        unidad: product.unidad,
        moneda: product.moneda,
        stock: product.stock,
        precio_compra: product.precio_compra,
        precio_venta: product.precio_venta,
        imagen: product.imagen,
        codigo_b: product.codigo_b,
        estado: product.estado
      })
      .then(objResponse => {
        console.log(objResponse);
        dispatch(requestSuccess(MODIFY_PRODUCT_SUCCESS, product));
        onClose();
      })
      .catch(objError => {
        dispatch(requestFail(MODIFY_PRODUCT_FAIL, objError));
      });
  };
}

export function deleteProduct(id, onClose) {
  return dispatch => {
    dispatch(requestBegin(DELETE_PRODUCT));
    return api
      .requestDELETE(`/productos/${id.id}`)
      .then(objResponse => {
        console.log(objResponse);
        dispatch(requestSuccess(DELETE_PRODUCT_SUCCESS, id.id));
        onClose();
      })
      .catch(objError => {
        dispatch(requestFail(DELETE_PRODUCT_FAIL, objError));
      });
  };
}
