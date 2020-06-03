import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Select, Rate, DatePicker, Input, Button, Divider } from "antd";
import { PushpinFilled, PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import "./editTask.css";
import { newLabelsAction, editTaskAction } from "../../actions/actions";
import moment from "moment";
import notificationOpen from "../../utils/notification";

const { Option } = Select;
const { TextArea } = Input;

function EditTask(props) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [label, setLabel] = useState("");
  const [priority, setPriority] = useState(1);
  const [newLabel, setNewLabel] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let labels = props.auth.labels;

  const submitForm = () => {
    const payload = {
      task_id: props.editTaskDetail.task_id,
      task_name: taskName,
      task_description: taskDescription,
      task_priority: priority.toString(),
      task_due_date: dueDate,
      task_label_value: label,
      task_status: status,
    };
    props.editTaskAction(payload, props.auth.user_token);
  };

  useEffect(() => {
    console.log(props.editTaskDetail)
    setTaskName(props.editTaskDetail.task_name);
    setTaskDescription(props.editTaskDetail.task_description);
    setDueDate(props.editTaskDetail.task_due_date);
    setLabel(props.editTaskDetail.task_label_value);
    setPriority(props.editTaskDetail.task_priority);
    setStatus(props.editTaskDetail.task_status);
  }, [props.editTaskDetail]);

  useEffect(() => {
    if (props.taskReducer.isTaskEdited) {
      let data = {
        type: "success",
        description: "Task Edited Succesfully!",
      };
      notificationOpen(data);
    }
  }, [props.taskReducer.isTaskEdited]);

  return (
    <div className="taskActionContainer1">
      <Modal
        title="Edit Task"
        visible={props.isVisible}
        onCancel={props.close}
        footer={null}
      >
        <div className="formContainer">
          <div className="formItemContainer">
            Task Name :{" "}
            <Input
              className="inputItem"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            />
          </div>
          <div className="formItemContainer">
            Description :{" "}
            <TextArea
              className="inputItem"
              value={taskDescription}
              onChange={(e) => {
                setTaskDescription(e.target.value);
              }}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </div>
          <div className="formItemContainer">
            Due Date :{" "}
            <DatePicker
              allowClear={false}
              value={moment(dueDate)}
              style={{ width: 253, marginLeft: 15 }}
              onChange={(dateString) => {
                setDueDate(dateString);
              }}
            />
          </div>
          <div className="formItemContainer">
            Label :{" "}
            <Select
              placeholder="Please select a label"
              style={{ width: 253, marginLeft: 43 }}
              value={label}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: "4px 0" }} />
                  <div
                    style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}
                  >
                    <Input
                      style={{ flex: "auto" }}
                      value={newLabel}
                      onChange={(e) => {
                        setNewLabel(e.target.value);
                      }}
                    />
                    <a
                      style={{
                        flex: "none",
                        padding: "8px",
                        display: "block",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setIsLoading(true);
                        props.newLabelsAction(
                          {
                            label_value: newLabel,
                          },
                          props.auth.user_token
                        );
                      }}
                    >
                      <PlusOutlined /> Add Label
                    </a>
                  </div>
                </div>
              )}
              onChange={(value) => {
                const labelName = labels.find(
                  (item) => item.label_id.toString() === value
                );
                setLabel(labelName.label_value);
              }}
            >
              {labels
                ? labels.map((item) => (
                    <Option key={item.label_id}>{item.label_value}</Option>
                  ))
                : null}
            </Select>
          </div>
          <div className="formItemContainer">
            Priority :{" "}
            <Rate
              character={<PushpinFilled />}
              value={priority}
              style={{ marginLeft: 30 }}
              onChange={(value) => setPriority(value)}
            />
          </div>
          <div className="formItemContainer">
            Status :{" "}
            <Select
              value={status}
              style={{ width: 253, marginLeft: 43 }}
              onChange={(value) => {
                setStatus(value);
              }}
            >
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
              <Option value="inprogress">Progress</Option>
            </Select>
          </div>
          <div className="formItemContainer">
            <Button className="btn" type="primary" onClick={() => submitForm()}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  taskReducer: state.taskReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    newLabelsAction: (parameters, token) =>
      dispatch(newLabelsAction(parameters, token)),
    editTaskAction: (parameters, token) =>
      dispatch(editTaskAction(parameters, token)),
  };
};
const editForm = connect(mapStateToProps, mapDispatchToProps)(EditTask);
export default editForm;
