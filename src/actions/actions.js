import {
  ADD_NEW_TASK_START,
  GET_LABELS_START,
  ADD_NEW_LABEL,
  GET_ALL_TASKS,
  USER_LOGIN,
  USER_SIGNUP,
  DELETE_TASK,
  EDIT_TASK,
  LOGOUT,
} from "../constants/constants";

export function addTaskAction(payload, token) {
  return {
    type: ADD_NEW_TASK_START,
    payload,
    token,
  };
}

export function fetchLabelsAction(token) {
  return {
    type: GET_LABELS_START,
    payload: token,
  };
}

export function newLabelsAction(params, token) {
  return {
    type: ADD_NEW_LABEL,
    payload: params,
    token,
  };
}

export function getAllTasks(params, token) {
  return {
    type: GET_ALL_TASKS,
    payload: params,
    token,
  };
}

export function userLogin(params) {
  return {
    type: USER_LOGIN,
    payload: params,
  };
}

export function userSignup(params) {
  return {
    type: USER_SIGNUP,
    payload: params,
  };
}

export function taskDelete(params, token) {
  return {
    type: DELETE_TASK,
    payload: params,
    token,
  };
}

export function editTaskAction(params, token) {
  return {
    type: EDIT_TASK,
    payload: params,
    token,
  };
}

export function logoutAction(email, token) {
  return {
    type: LOGOUT,
    payload: {
      email,
    },
    token: token,
  };
}
