import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_LABELS_START,
  GET_LABELS_SUCCESS,
  GET_LABELS_FAILED,
  GET_ALL_TASKS,
  GET_ALL_TASKS_FAILED,
  GET_ALL_TASKS_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT,
} from "../constants/constants";

import { getLabels, getAllTasksApi } from "../api/api.addTasks";
import {
  userLoginApi,
  userSignupApi,
  userLogoutApi,
} from "../api/api.userLogin";

export function* fetchLables(action) {
  try {
    const parameters = action.payload;
    const responseBody = yield call(getLabels, parameters[0].userDetail.token);
    yield put({
      type: GET_LABELS_SUCCESS,
      payload: responseBody.data.data,
    });
  } catch (e) {
    yield put({
      type: GET_LABELS_FAILED,
      payload: {
        error: true,
      },
      callback: action.callback,
    });
  }
}

export function* getAllTasks(action) {
  try {
    const parameters = action.payload;
    const responseBody = yield call(getAllTasksApi, {
      parameters,
      token: action.token,
    });
    yield put({
      type: GET_ALL_TASKS_SUCCESS,
      payload: responseBody.data.data,
    });
  } catch (e) {
    yield put({
      type: GET_ALL_TASKS_FAILED,
      payload: {
        error: true,
      },
      callback: action.callback,
    });
  }
}

export function* userLogin(action) {
  try {
    const parameters = action.payload;
    const responseBody = yield call(userLoginApi, parameters);
    yield put({
      type: USER_LOGIN_SUCCESS,
      payload: responseBody.data.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOGIN_FAILED,
      payload: {
        error: true,
        response: e.response.data.Error,
      },
      callback: action.callback,
    });
  }
}

export function* userSignup(action) {
  try {
    const parameters = action.payload;
    const responseBody = yield call(userSignupApi, parameters);
    yield put({
      type: USER_SIGNUP_SUCCESS,
      payload: responseBody.data.data,
    });
  } catch (e) {
    yield put({
      type: USER_SIGNUP_FAILED,
      payload: {
        error: true,
        response: e.response.data.Error,
      },
      callback: action.callback,
    });
  }
}

export function* userLogout(action) {
  try {
    const parameters = action.payload;
    const responseBody = yield call(userLogoutApi, {
      parameters,
      token: action.token,
    });
    yield put({
      type: LOGOUT_SUCCESS,
      payload: responseBody.data.data,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILED,
      payload: {
        error: true,
        response: e.response.data.Error,
      },
      callback: action.callback,
    });
  }
}

export function* rootWatcherSaga() {
  yield takeLatest(GET_LABELS_START, fetchLables);
  yield takeLatest(GET_ALL_TASKS, getAllTasks);
  yield takeLatest(USER_LOGIN, userLogin);
  yield takeLatest(USER_SIGNUP, userSignup);
  yield takeLatest(USER_LOGIN_SUCCESS, fetchLables);
  yield takeLatest(LOGOUT, userLogout);
  // yield takeLatest(DELETE_TASK_SUCCESS , getAllTasks)
}
