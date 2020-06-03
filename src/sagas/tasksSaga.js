import { takeLatest, call, put } from "redux-saga/effects";
import {
  ADD_NEW_TASK_START,
  ADD_NEW_TASK_SUCCESS,
  ADD_NEW_TASK_FAILED,
  ADD_NEW_LABEL,
  ADD_NEW_LABEL_SUCCESS,
  ADD_NEW_LABEL_FAILED,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILED,
  EDIT_TASK,
  EDIT_TASK_FAILED,
  EDIT_TASK_SUCCESS,
} from "../constants/constants";

import {
  addTasks,
  addNewLabel,
  deleteTask,
  editTask,
} from "../api/api.addTasks";

export function* addNewTask(action) {
  try {
    const parameters = action.payload;
    const responseBody = yield call(addTasks, {
      parameters,
      token: action.token,
    });
    yield put({
      type: ADD_NEW_TASK_SUCCESS,
      payload: responseBody,
    });
  } catch (e) {
    yield put({
      type: ADD_NEW_TASK_FAILED,
      payload: {
        error: true,
      },
      // callback: action.callback,
    });
  }
}

export function* newLabel(action) {
  try {
    const parameters = action.payload;
    const responseBody = yield call(addNewLabel, {
      parameters,
      token: action.token,
    });
    yield put({
      type: ADD_NEW_LABEL_SUCCESS,
      payload: responseBody.data.data,
    });
  } catch (e) {
    yield put({
      type: ADD_NEW_LABEL_FAILED,
      payload: {
        error: true,
      },
      // callback: action.callback,
    });
  }
}

export function* deleteTaskSaga(action) {
  try {
    const parameters = action.payload;
    const responseBody = yield call(deleteTask, {
      parameters,
      token: action.token,
    });
    yield put({
      type: DELETE_TASK_SUCCESS,
      payload: responseBody.data.data,
    });
  } catch (e) {
    yield put({
      type: DELETE_TASK_FAILED,
      payload: {
        error: true,
      },
      // callback: action.callback,
    });
  }
}

export function* editTaskSaga(action) {
  try {
    const parameters = action.payload;
    const responseBody = yield call(editTask, {
      parameters,
      token: action.token,
    });
    yield put({
      type: EDIT_TASK_SUCCESS,
      payload: responseBody.data.data,
    });
  } catch (e) {
    yield put({
      type: EDIT_TASK_FAILED,
      payload: {
        error: true,
      },
      // callback: action.callback,
    });
  }
}

export function* taskWatcherSaga() {
  yield takeLatest(ADD_NEW_TASK_START, addNewTask);
  yield takeLatest(ADD_NEW_LABEL, newLabel);
  yield takeLatest(DELETE_TASK, deleteTaskSaga);
  yield takeLatest(EDIT_TASK, editTaskSaga);
}
