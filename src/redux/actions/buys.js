import api from "../../api";
import { getProducts } from "./product";
import { getProviders } from "./provider";

export const GET_BUYS = "GET_BUYS";
export const GET_BUYS_SUCCESS = "GET_BUYS_SUCCESS";
export const GET_BUYS_FAIL = "GET_BUYS_FAIL";
export const CREATE_BUY = "CREATE_BUY";
export const CREATE_BUY_SUCCESS = "CREATE_BUY_SUCCESS";
export const CREATE_BUY_FAIL = "CREATE_BUY_FAIL";

function requestBegin(type) {
  return { type };
}

function requestSuccess(type, buy, message) {
  return { type, payload: { buy, message } };
}

function requestFail(type, message) {
  return { type, payload: { message } };
}

export function getBuys() {
  return dispatch => {
    dispatch(getProducts());
    dispatch(getProviders());
    dispatch(requestBegin(GET_BUYS));
    return api
      .requestGET("/compras")
      .then(objResponse => {
        dispatch(requestSuccess(GET_BUYS_SUCCESS, objResponse.data.results));
      })
      .catch(objError => {
        dispatch(requestFail(GET_BUYS_FAIL, objError));
      });
  };
}

export function createBuy(buy, action) {
  return dispatch => {
    dispatch(requestBegin(CREATE_BUY));
    return api
      .requestPOST("users/compras", {
        numero_compra: buy.numero_compra,
        comprador: buy.comprador,
        moneda: buy.moneda,
        subtotal: buy.subtotal,
        total_iva: buy.total_iva,
        total: buy.total,
        tipo_pago: buy.tipo_pago,
        descuento: buy.descuento,
        importe: buy.importe,
        proveedor_id: buy.proveedor_id,
        productos: buy.productos
      })
      .then(objResponse => {
        dispatch(requestSuccess(CREATE_BUY_SUCCESS, objResponse.data));
        action();
      })
      .catch(objError => {
        dispatch(requestFail(CREATE_BUY_FAIL, objError));
      });
  };
}