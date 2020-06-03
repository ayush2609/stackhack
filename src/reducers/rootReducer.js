import {
  GET_LABELS_FAILED,
  GET_LABELS_SUCCESS,
  GET_LABELS_START,
  ADD_NEW_LABEL,
  ADD_NEW_LABEL_FAILED,
  ADD_NEW_LABEL_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  GET_ALL_TASKS,
  GET_ALL_TASKS_SUCCESS,
  GET_ALL_TASKS_FAILED,
  DELETE_TASK_SUCCESS,
  ADD_NEW_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  LOGOUT_SUCCESS,
} from "../constants/constants";

const initialState = {
  isLabelsFetched: false,
  error: false,
  isLoading: false,
  labels: [],
  allTasks: [],
  isTasksLoaded: false,
  isLabelAdded: false,
  isLoggedIn: false,
  email: "",
  user_name: "",
  user_token: "",
  user_id: "",
  errorMsg: "",
  isRegistered: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        isLoggedIn: false,
        error: false,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        error: false,
        email: action.payload[0].userDetail.email,
        user_name: action.payload[0].userDetail.name,
        user_token: action.payload[0].userDetail.token,
        user_id: action.payload[0].userDetail.user_id,
        stats: action.payload[1].stats,
        overdueTasks: action.payload[2].tasks[0].overdue,
        urgentTasks: action.payload[2].tasks[1].urgent,
      };
    }
    case USER_LOGIN_FAILED: {
      return {
        ...state,
        isLoggedIn: false,
        error: true,
        errorMsg: action.payload.response[0].message,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        initialState,
      };
    }
    case USER_SIGNUP: {
      return {
        ...state,
        isRegistered: false,
        error: false,
      };
    }
    case USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        isRegistered: true,
        error: false,
      };
    }
    case USER_SIGNUP_FAILED: {
      return {
        ...state,
        isRegistered: false,
        error: true,
        errorMsg: action.payload.response[0].message,
      };
    }
    case GET_LABELS_START: {
      return {
        ...state,
        isLoading: true,
        isLabelsFetched: false,
        error: false,
      };
    }
    case GET_LABELS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        labels: action.payload,
        isLabelsFetched: true,
        error: false,
      };
    }
    case GET_LABELS_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLabelsFetched: false,
        error: true,
      };
    }
    case ADD_NEW_LABEL: {
      return {
        ...state,
        isLabelAdded: false,
        isLoading: true,
      };
    }
    case ADD_NEW_LABEL_SUCCESS: {
      return {
        ...state,
        labels: action.payload,
        isLabelAdded: true,
        isLoading: false,
      };
    }
    case ADD_NEW_LABEL_FAILED: {
      return {
        ...state,
        isLabelAdded: false,
        isLoading: false,
      };
    }
    case GET_ALL_TASKS: {
      return {
        ...state,
        isTasksLoaded: false,
        error: false,
      };
    }
    case GET_ALL_TASKS_SUCCESS: {
      return {
        ...state,
        allTasks: action.payload,
        isTasksLoaded: true,
        error: false,
      };
    }
    case GET_ALL_TASKS_FAILED: {
      return {
        ...state,
        allTaks: action.payload,
        isTasksLoaded: false,
        error: true,
      };
    }
    case DELETE_TASK_SUCCESS: {
      return {
        ...state,
        stats: action.payload[1].stats,
        overdueTasks: action.payload[2].tasks[0].overdue,
        urgentTasks: action.payload[2].tasks[1].urgent,
      };
    }
    case ADD_NEW_TASK_SUCCESS: {
      return {
        ...state,
        stats: action.payload.data.data[1].stats,
        overdueTasks: action.payload.data.data[2].tasks[0].overdue,
        urgentTasks: action.payload.data.data[2].tasks[1].urgent,
      };
    }
    case EDIT_TASK_SUCCESS: {
      return {
        ...state,
        stats: action.payload[1].stats,
        overdueTasks: action.payload[2].tasks[0].overdue,
        urgentTasks: action.payload[2].tasks[1].urgent,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;
