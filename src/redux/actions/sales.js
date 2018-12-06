import api from "../../api";
import { getProducts } from "./product";
import { getClients } from "./client";

export const GET_SALES = "GET_SALES";
export const GET_SALES_SUCCESS = "GET_SALES_SUCCESS";
export const GET_SALES_FAIL = "GET_SALES_FAIL";
export const CREATE_SALE = "CREATE_SALE";
export const CREATE_SALE_SUCCESS = "CREATE_SALE_SUCCESS";
export const CREATE_SALE_FAIL = "CREATE_SALE_FAIL";

function requestBegin(type) {
  return { type };
}

function requestSuccess(type, sale, message) {
  return { type, payload: { sale, message } };
}

function requestFail(type, message) {
  return { type, payload: { message } };
}

export function getSales() {
  return dispatch => {
    dispatch(getProducts());
    dispatch(getClients());
    dispatch(requestBegin(GET_SALES));
    return api
      .requestGET("/ventas")
      .then(objResponse => {
        dispatch(requestSuccess(GET_SALES_SUCCESS, objResponse.data.results));
      })
      .catch(objError => {
        dispatch(requestFail(GET_SALES_FAIL, objError));
      });
  };
}

export function createSale(sale, action) {
  return dispatch => {
    dispatch(requestBegin(CREATE_SALE));
    return api
      .requestPOST("users/ventas", {
        numero_venta: sale.numero_venta,
        vendedor: sale.vendedor,
        moneda: sale.moneda,
        subtotal: sale.subtotal,
        total_iva: sale.total_iva,
        total: sale.total,
        tipo_pago: sale.tipo_pago,
        descuento: sale.descuento,
        importe: sale.importe,
        cliente_id: sale.cliente_id,
        productos: sale.productos
      })
      .then(objResponse => {
        dispatch(requestSuccess(CREATE_SALE_SUCCESS, objResponse.data));
        action();
      })
      .catch(objError => {
        dispatch(requestFail(CREATE_SALE_FAIL, objError));
      });
  };
}