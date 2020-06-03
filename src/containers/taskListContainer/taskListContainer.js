import React, { useState, useEffect } from "react";
import "./taskListContainer.css";
import SingleTask from "../../components/singleTask/singleTask";
import { Badge, Menu, Dropdown } from "antd";
import { Pagination } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  DownOutlined,
  PlayCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import EditTask from "../editTask/editTask";
import NoData from "../../components/noData/noData";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { taskDelete, editTaskAction } from "../../actions/actions";
import notificationOpen from "../../utils/notification";

function TaskListContainerFunction(props) {
  const [taskSelected, taskSelection] = useState(1);
  const [editTaskDetail, setTaskDetails] = useState({});
  const [isEdit, openEdit] = useState(false);

  //on clicking a taskss
  const taskSelect = (key) => {
    taskSelection(key);
  };

  const handleEdit = (task) => {
    setTaskDetails(task);
    openEdit(true);
  };

  const handleDelete = (task) => {
    props.taskDelete(task, props.auth.user_token);
  };

  useEffect(() => {
    if (props.taskReducer.isTaskEdited) {
      closeModal();
    }
  }, [props.taskReducer.isTaskEdited]);

  const closeModal = () => {
    openEdit(false);
    setTaskDetails("");
  };

  useEffect(() => {
    if (props.taskReducer.isTaskDeleted) {
      let data = {
        type: "success",
        description: "Task Deleted Succesfully!",
      };
      notificationOpen(data);
    }
  }, [props.taskReducer.isTaskDeleted]);

  //status change
  const changeStatus = (status) => {
    const payload = {
      task_id: taskSelected,
      task_status: status,
    };
    props.editTaskAction(payload, props.auth.user_token);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" className="statusMenu">
        <CheckCircleOutlined
          style={{ color: "green", fontSize: 20, marginTop: 4 }}
        />
        <p className="menuItem" onClick={() => changeStatus("completed")}>
          Completed
        </p>
      </Menu.Item>
      <Menu.Item key="1" className="statusMenu">
        <PlayCircleOutlined
          style={{ color: "blue", fontSize: 20, marginTop: 4 }}
        />{" "}
        <p className="menuItem" onClick={() => changeStatus("inprogress")}>
          In Progress
        </p>
      </Menu.Item>
      <Menu.Item key="3" className="statusMenu">
        <WarningOutlined style={{ color: "red", fontSize: 20, marginTop: 4 }} />
        <p className="menuItem" onClick={() => changeStatus("pending")}>
          Pending
        </p>
      </Menu.Item>
    </Menu>
  );

  let list = props.tasks
    ? props.tasks.map((item) => {
        return (
          <div key={item.task_id}>
            <SingleTask task={item} taskSelect={taskSelect} />
            {taskSelected === item.task_id ? (
              <div className="actionPanel">
                <div className="actionIcons">
                  <EditOutlined
                    style={{ marginLeft: 10, fontSize: 20 }}
                    onClick={() => handleEdit(item)}
                  />
                  <DeleteOutlined
                    style={{ marginLeft: 20, fontSize: 20 }}
                    onClick={() => handleDelete(item)}
                  />
                  <Dropdown overlay={menu}>
                    <a
                      className="ant-dropdown-link"
                      style={{ color: "black", marginLeft: 10 }}
                    >
                      Change Status <DownOutlined />
                    </a>
                  </Dropdown>
                  <div className="closeBtn">
                    <CloseOutlined
                      style={{ fontSize: 20 }}
                      onClick={() => {
                        taskSelection(-1);
                      }}
                    />
                  </div>
                </div>
                <br />
                <div>
                  <Badge color="cyan" text="DESCRIPTION" /> :{" "}
                  {item.task_description}
                </div>
              </div>
            ) : null}
          </div>
        );
      })
    : null;

  return (
    <div className="taskListContainer1">
      {props.tasks && props.tasks.length > 0 ? (
        list
      ) : (
        <div className="nodata">
          <NoData taskName={"tasks"} />
        </div>
      )}
      {props.showPagination ? (
        <Pagination defaultCurrent={1} total={50} />
      ) : null}
      <br />
      <EditTask
        isVisible={isEdit}
        close={() => closeModal()}
        editTaskDetail={editTaskDetail}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  taskReducer: state.taskReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    taskDelete: (parameters, token) => dispatch(taskDelete(parameters, token)),
    editTaskAction: (parameters, token) =>
      dispatch(editTaskAction(parameters, token)),
  };
};

const TaskListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListContainerFunction);

export default withRouter(TaskListContainer);
