import React, { useState, useEffect } from "react";
import { Form, Select, Rate, DatePicker, Input, Button, Divider } from "antd";
import { PushpinFilled, PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  addTaskAction,
  newLabelsAction,
  getAllTasks,
} from "../../actions/actions";
import Loader from "../loader/loader";
import notificationOpen from "../../utils/notification";

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AddTaskForm = (props) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [label, setLabel] = useState("");
  const [priority, setPriority] = useState(1);
  const [newLabel, setNewLabel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let labels = props.auth.labels;

  useEffect(() => {
    setIsLoading(false);
    setNewLabel("");
  }, [props.auth.labels]);

  useEffect(() => {
    if (props.taskReducer.isTaskAdded) {
      setIsLoading(false);
      let data = {
        type: "success",
        description: "Task Created Succesfully!",
      };
      notificationOpen(data);
    }
  }, [props.taskReducer.isTaskAdded]);

  const onFinish = (values) => {
    const payload = {
      task_name: taskName,
      task_description: taskDescription,
      task_priority: priority.toString(),
      task_due_date: dueDate,
      task_label_id: "1",
      task_label_value: label,
      task_status: "pending",
    };
    setIsLoading(true);
    props.addTaskAction(payload, props.auth.user_token);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        {...formItemLayout}
        name="task_name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input task name",
          },
        ]}
      >
        <Input
          placeholder="Please input task name"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        name="task_description"
        label="Description"
      >
        <TextArea
          placeholder="Please input task description"
          value={taskDescription}
          onChange={(e) => {
            setTaskDescription(e.target.value);
          }}
          allowClear
        />
      </Form.Item>

      <Form.Item name="task_due_dater" label="Due date"
      rules={[
        {
          required: true,
          message: "Please input task due date",
        } ]}
      >
        <DatePicker
          format="YYYY-MM-DD"
          onChange={(date, dateString) => {
            setDueDate(dateString);
          }}
          onOk={(date, dateString) => {
            setDueDate(dateString);
          }}
        />
      </Form.Item>

      <Form.Item name="task_label_value" label="Select Label" hasFeedback>
        <Select
          placeholder="Please select a label"
          style={{ width: 240 }}
          dropdownRender={(menu) => (
            <div>
              {menu}
              <Divider style={{ margin: "4px 0" }} />
              <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
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
                    // setIsLoading(true);
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
          {labels.map((item) => (
            <Option key={item.label_id}>{item.label_value}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="task_priority" label="Priority">
        <Rate
          character={<PushpinFilled />}
          value={priority}
          onChange={(value) => setPriority(value)}
        />
      </Form.Item>

      <Form.Item name="task_status" label="Status">
        <span className="ant-form-text">Pending</span>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  taskReducer: state.taskReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addTaskAction: (parameters, token) =>
      dispatch(addTaskAction(parameters, token)),
    newLabelsAction: (parameters, token) =>
      dispatch(newLabelsAction(parameters, token)),
    getAllTasks: (parameters, token) =>
      dispatch(getAllTasks(parameters, token)),
  };
};

const TaskForm = connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);

export default TaskForm;
