import api from "../../api";

export const GET_CLIENTS = "GET_CLIENTS";
export const GET_CLIENTS_SUCCESS = "GET_CLIENTS_SUCCESS";
export const GET_CLIENTS_FAIL = "GET_CLIENTS_FAIL";
export const CREATE_CLIENT = "CREATE_CLIENT";
export const CREATE_CLIENT_SUCCESS = "CREATE_CLIENT_SUCCESS";
export const CREATE_CLIENT_FAIL = "CREATE_CLIENT_FAIL";
export const MODIFY_CLIENT = "MODIFY_CLIENT";
export const MODIFY_CLIENT_SUCCESS = "MODIFY_CLIENT_SUCCESS";
export const MODIFY_CLIENT_FAIL = "MODIFY_CLIENT_FAIL";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const DELETE_CLIENT_SUCCESS = "DELETE_CLIENT_SUCCESS";
export const DELETE_CLIENT_FAIL = "DELETE_CLIENT_FAIL";

function requestBegin(type) {
  return { type };
}

function requestSuccess(type, client, message) {
  return { type, payload: { client, message } };
}

function requestFail(type, message) {
  return { type, payload: { message } };
}

export function getClients() {
  return dispatch => {
    dispatch(requestBegin(GET_CLIENTS));
    return api
      .requestGET("/clientes")
      .then(objResponse => {
        dispatch(requestSuccess(GET_CLIENTS_SUCCESS, objResponse.data.results));
      })
      .catch(objError => {
        dispatch(requestFail(GET_CLIENTS_FAIL, objError));
      });
  };
}

export function createClient(client, onClose) {
  return dispatch => {
    dispatch(requestBegin(CREATE_CLIENT));
    return api
      .requestPOST("/clientes", {
        nombres: client.nombres,
        appelidos: client.appelidos,
        cedula: client.cedula,
        telefono: client.telefono,
        direccion: client.direccion,
        correo: client.correo
      })
      .then(objResponse => {
        dispatch(requestSuccess(CREATE_CLIENT_SUCCESS, objResponse.data));
        onClose();
      })
      .catch(objError => {
        dispatch(requestFail(CREATE_CLIENT_FAIL, objError));
      });
  };
}

export function modifyClient(client, onClose) {
  return dispatch => {
    dispatch(requestBegin(MODIFY_CLIENT));
    return api
      .requestPUT(`/clientes/${client.id}`, {
        nombres: client.nombres,
        appelidos: client.appelidos,
        cedula: client.cedula,
        telefono: client.telefono,
        direccion: client.direccion,
        correo: client.correo
      })
      .then(objResponse => {
        console.log(objResponse);
        dispatch(requestSuccess(MODIFY_CLIENT_SUCCESS, client));
        onClose();
      })
      .catch(objError => {
        dispatch(requestFail(MODIFY_CLIENT_FAIL, objError));
      });
  };
}

export function deleteClient(id, onClose) {
  return dispatch => {
    dispatch(requestBegin(DELETE_CLIENT));
    return api
      .requestDELETE(`/clientes/${id.id}`)
      .then(objResponse => {
        console.log(objResponse);
        dispatch(requestSuccess(DELETE_CLIENT_SUCCESS, id.id));
        onClose();
      })
      .catch(objError => {
        dispatch(requestFail(DELETE_CLIENT_FAIL, objError));
      });
  };
}
