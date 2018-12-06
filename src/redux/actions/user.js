import api from "../../api";
import Cookie from "react-cookies";
import { navigate } from "./navigate";

export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";
export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAIL = "CREATE_USER_FAIL";
export const MODIFY_USER = "MODIFY_USER";
export const MODIFY_USER_SUCCESS = "MODIFY_USER_SUCCESS";
export const MODIFY_USER_FAIL = "MODIFY_USER_FAIL";
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

function logoutBegin() {
  return { type: LOGOUT };
}

function loginBegin() {
  return { type: LOGIN };
}

function loginSucess(user) {
  return { type: LOGIN_SUCCESS, user };
}

function loginFail(error) {
  return { type: LOGIN_FAIL, error };
}

function getUsersBegin() {
  return { type: GET_USERS };
}

function getUsersSuccess(users) {
  return { type: GET_USERS_SUCCESS, users };
}

function getUsersFail(error) {
  return { type: GET_USERS_FAIL, error };
}

function createUserBegin() {
  return { type: CREATE_USER };
}

function createUserSuccess(user) {
  return { type: CREATE_USER_SUCCESS, user };
}

function createUserFail(error) {
  return { type: CREATE_USER_FAIL, error };
}

function modifyUserBegin() {
  return { type: MODIFY_USER };
}

function modifyUserSuccess(user) {
  return { type: MODIFY_USER_SUCCESS, user };
}

function modifyUserFail(error) {
  return { type: MODIFY_USER_FAIL, error };
}

function deleteUserBegin() {
  return { type: DELETE_USER };
}

function deleteUserSuccess(id) {
  return { type: DELETE_USER_SUCCESS, id };
}

function deleteUserFail(error) {
  return { type: DELETE_USER_FAIL, error };
}

export function logout() {
  return dispatch => {
    return dispatch(logoutBegin());
  }
}

export function login(email, password, rememberMe) {
  return dispatch => {
    dispatch(loginBegin());
    return api.requestPOST("/users/login", {
      correo: email,
      password: password
    })
    .then(objResponse => {
      Cookie.save("sessionCookie", objResponse.data.data, {
        path: "/",
        maxAge: 3600
      });
      if (rememberMe === true) {
        const preferences = { email: email, rememberMe: rememberMe };
        Cookie.save("userPreferences", preferences, { path: "/" });
      } else {
        Cookie.remove("userPreferences");
      }
      dispatch(loginSucess(objResponse.data.results));
      dispatch(navigate("/dashboard"));
    })
    .catch(objError => {
      dispatch(loginFail(objError));
    });
  };
}

export function getUsers() {
  return dispatch => {
    dispatch(getUsersBegin());
    return api.requestGET("/usuarios")
    .then(objResponse => {
      dispatch(getUsersSuccess(objResponse.data.results));
    })
    .catch(objError => {
      dispatch(getUsersFail(objError));
    });
  };
}

export function createUser(user, onClose) {
  return dispatch => {
    dispatch(createUserBegin());
    return api.requestPOST("/usuarios", {
      nombres: user.nombres,
      appelidos: user.appelidos,
      cedula: user.cedula,
      telefono: user.telefono,
      direccion: user.direccion,
      usuario: user.usuario,
      correo: user.correo,
      password: user.password
    })
    .then(objResponse => {
      dispatch(createUserSuccess(objResponse.data));
      onClose();
    })
    .catch(objError => {
      dispatch(createUserFail(objError));
    });
  };
}

export function modifyUser(user, onClose) {
  return dispatch => {
    dispatch(modifyUserBegin());
    return api.requestPUT(`/usuarios/${user.id}`, {
      nombres: user.nombres,
      appelidos: user.appelidos,
      cedula: user.cedula,
      telefono: user.telefono,
      direccion: user.direccion,
      usuario: user.usuario,
      correo: user.correo,
      password: user.password
    })
      .then(objResponse => {
        console.log(objResponse);
        dispatch(modifyUserSuccess(user));
        onClose();
      })
      .catch(objError => {
        dispatch(modifyUserFail(objError));
      });
  };
}

export function deleteUser(id, onClose) {
  return dispatch => {
    dispatch(deleteUserBegin());
    return api.requestDELETE(`/usuarios/${id.id}`)
      .then(objResponse => {
        console.log(objResponse);
        dispatch(deleteUserSuccess(id.id));
        onClose();
      })
      .catch(objError => {
        dispatch(deleteUserFail(objError));
      });
  };
}