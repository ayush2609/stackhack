import {
  ADD_NEW_TASK_START,
  ADD_NEW_TASK_FAILED,
  ADD_NEW_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILED,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAILED,
  EDIT_TASK,
  DELETE_TASK,
  LOGOUT_SUCCESS,
} from "../constants/constants";

const initialState = {
  isTaskAdded: false,
  error: false,
  isLoading: false,
  errorMsg: "",
  isTaskEdited: false,
  isTaskDeleted: false,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TASK_START: {
      return {
        ...state,
        isTaskAdded: false,
        error: false,
        isLoading: true,
      };
    }
    case ADD_NEW_TASK_SUCCESS: {
      return {
        ...state,
        isTaskDeleted: false,
        isTaskEdited: false,
        isTaskAdded: true,
        error: false,
        isLoading: false,
      };
    }
    case ADD_NEW_TASK_FAILED: {
      return {
        ...state,
        isTaskAdded: false,
        error: true,
        isLoading: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        initialState,
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        isTaskDeleted: false,
        error: false,
        isLoading: false,
      };
    }
    case DELETE_TASK_SUCCESS: {
      return {
        ...state,
        isTaskAdded: false,
        isTaskEdited: false,
        isTaskDeleted: true,
        error: false,
        isLoading: false,
      };
    }
    case DELETE_TASK_FAILED: {
      return {
        ...state,
        isTaskDeleted: false,
        error: true,
        errorMsg: action.payload[0].taskDetail[0].message,
        isLoading: false,
      };
    }
    case EDIT_TASK: {
      return {
        ...state,
        isTaskEdited: false,
        error: false,
        isLoading: false,
      };
    }
    case EDIT_TASK_SUCCESS: {
      return {
        ...state,
        isTaskEdited: true,
        isTaskAdded: false,
        isTaskDeleted: false,
        error: false,
        isLoading: false,
      };
    }
    case EDIT_TASK_FAILED: {
      return {
        ...state,
        isTaskEdited: false,
        error: true,
        errorMsg: action.payload[0].taskDetail[0].message,
        isLoading: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default taskReducer;
