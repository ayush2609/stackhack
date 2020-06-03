import React from "react";
import { Collapse } from "antd";
import "./addTask.css";
import TaskForm from "../form/form";

const { Panel } = Collapse;

const AddTask = (props) => {

  return (
    <div className="addTaskContainer">
      <Collapse bordered={false} defaultActiveKey={[]}>
        <Panel header="Add new task" key="1">
          <TaskForm />
        </Panel>
      </Collapse>
    </div>
  );
};

export default AddTask;
