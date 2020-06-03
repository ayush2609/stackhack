import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./taskList.css";
import TaskListContainer from "../taskListContainer/taskListContainer";
import FilterPanel from "../../components/filterPanel/filterPanel";
import { getAllTasks } from "../../actions/actions";

const Task = (props) => {

  useEffect(() => {
    if (props.auth.isLoggedIn) {
      const payload = {
        status: "all",
        label: "all",
        // startDate: moment().format("YYYY-MM-DD").toString(),
        // endDate: moment().format("YYYY-MM-DD").toString(),
      };
      props.getAllTasks(payload, props.auth.user_token);
    }
  }, [props.auth.isLoggedIn]);

  return (
    <div className="taskListContainer">
      <FilterPanel />
      <TaskListContainer tasks={props.auth.allTasks} showPagination={false} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: (parameters, token) =>
      dispatch(getAllTasks(parameters, token)),
  };
};

const TaskList = connect(mapStateToProps, mapDispatchToProps)(Task);

export default TaskList;
