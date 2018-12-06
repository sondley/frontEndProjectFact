import api from "../../api";

export const GET_PROVIDERS = "GET_PROVIDERS";
export const GET_PROVIDERS_SUCCESS = "GET_PROVIDERS_SUCCESS";
export const GET_PROVIDERS_FAIL = "GET_PROVIDERS_FAIL";
export const CREATE_PROVIDER = "CREATE_PROVIDER";
export const CREATE_PROVIDER_SUCCESS = "CREATE_PROVIDER_SUCCESS";
export const CREATE_PROVIDER_FAIL = "CREATE_PROVIDER_FAIL";
export const MODIFY_PROVIDER = "MODIFY_PROVIDER";
export const MODIFY_PROVIDER_SUCCESS = "MODIFY_PROVIDER_SUCCESS";
export const MODIFY_PROVIDER_FAIL = "MODIFY_PROVIDER_FAIL";
export const DELETE_PROVIDER = "DELETE_PROVIDER";
export const DELETE_PROVIDER_SUCCESS = "DELETE_PROVIDER_SUCCESS";
export const DELETE_PROVIDER_FAIL = "DELETE_PROVIDER_FAIL";

function requestBegin(type) {
  return { type };
}

function requestSuccess(type, provider, message) {
  return { type, payload: { provider, message } };
}

function requestFail(type, message) {
  return { type, payload: { message } };
}

export function getProviders() {
  return dispatch => {
    dispatch(requestBegin(GET_PROVIDERS));
    return api
      .requestGET("/proveedores")
      .then(objResponse => {
        dispatch(requestSuccess(GET_PROVIDERS_SUCCESS, objResponse.data.results));
      })
      .catch(objError => {
        dispatch(requestFail(GET_PROVIDERS_FAIL, objError));
      });
  };
}

export function createProvider(provider, onClose) {
  return dispatch => {
    dispatch(requestBegin(CREATE_PROVIDER));
    return api
      .requestPOST("/proveedores", {
        razon_social: provider.razon_social,
        cedula: provider.cedula,
        telefono: provider.telefono,
        direccion: provider.direccion,
        correo: provider.correo
      })
      .then(objResponse => {
        dispatch(requestSuccess(CREATE_PROVIDER_SUCCESS, objResponse.data));
        onClose();
      })
      .catch(objError => {
        dispatch(requestFail(CREATE_PROVIDER_FAIL, objError));
      });
  };
}

export function modifyProvider(provider, onClose) {
  return dispatch => {
    dispatch(requestBegin(MODIFY_PROVIDER));
    return api
      .requestPUT(`/proveedores/${provider.id}`, {
        razon_social: provider.razon_social,
        cedula: provider.cedula,
        telefono: provider.telefono,
        direccion: provider.direccion,
        correo: provider.correo
      })
      .then(objResponse => {
        console.log(objResponse);
        dispatch(requestSuccess(MODIFY_PROVIDER_SUCCESS, provider));
        onClose();
      })
      .catch(objError => {
        dispatch(requestFail(MODIFY_PROVIDER_FAIL, objError));
      });
  };
}

export function deleteProvider(id, onClose) {
  return dispatch => {
    dispatch(requestBegin(DELETE_PROVIDER));
    return api
      .requestDELETE(`/proveedores/${id.id}`)
      .then(objResponse => {
        console.log(objResponse);
        dispatch(requestSuccess(DELETE_PROVIDER_SUCCESS, id.id));
        onClose();
      })
      .catch(objError => {
        dispatch(requestFail(DELETE_PROVIDER_FAIL, objError));
      });
  };
}
