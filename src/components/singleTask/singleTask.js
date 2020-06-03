import React, { useState } from "react";
import "./singleTask.css";
import { Rate } from "antd";
import { Tag } from "antd";
import moment from "moment";
import { CalendarOutlined, PushpinFilled } from "@ant-design/icons";

function SingleTask(props) {
  //color coding of label
  let tabColor = (label) => {
    switch (label) {
      case "Personal":
        return "volcano";
      case "Work":
        return "purple";
      case "Others":
        return "magenta";
      case "Shopping":
        return "geekblue";
      default:
        return "geekblue";
    }
  };
  let statusColor = (status) => {
    switch (status) {
      case "pending":
        return "red";
      case "completed":
        return "green";
      case "inprogress":
        return "blue";
      default:
        return "geekblue";
    }
  };

  const [isStatusChange, setSatusChange] = useState(false);
  const [currentTaskId, setTaskId] = useState(-1);

  //on clicking a task
  const handleClickTask = (key) => {
    setSatusChange(true);
    setTaskId(key);
    props.taskSelect(key);
  };

  return (
    <div
      className="singletaskContainer"
      onClick={() => {
        handleClickTask(props.task.task_id);
      }}
    >
      <div>
        <p>Name : {props.task.task_name}</p>
        <Tag color={tabColor(props.task.task_label_value)}>
          {props.task.task_label_value}
        </Tag>
        <Tag
          color={statusColor(props.task.task_status)}
          style={{ marginBottom: 5 }}
        >
          {props.task.task_status}
        </Tag>
      </div>

      <div>
        <p className="time">
          <CalendarOutlined /> 
    {'  '}{moment(props.task.task_due_date).format("DD-MM-YYYY")}
        </p>
        <Rate
          defaultValue={props.task.task_priority}
          disabled="true"
          character={<PushpinFilled />}
          value={props.task.task_priority}
        />
      </div>
    </div>
  );
}

export default SingleTask;
