import React, { useState, useEffect } from "react";
import "./filterPanel.css";
import { Select } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { ReloadOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { connect } from "react-redux";
import { getAllTasks } from "../../actions/actions";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Filter = (props) => {
  const [label, handleLabel] = useState("all");
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [date, setDate] = useState(null);
  const fetchData = (obj) => {
    props.getAllTasks(obj, props.auth.user_token);
  };

  const onChange = (value) => {
    setDate(value);
    const start = moment(value[0]).format("YYYY-MM-DD");
    const end = moment(value[1]).format("YYYY-MM-DD");
    setStartDate(startDate);
    setEndDate(endDate);
    const obj = {
      status: status,
      label: label,
      startDate: start,
      endDate: end,
    };
    fetchData(obj);
  };

  useEffect(() => {
    if (
      props.taskReducer.isTaskAdded ||
      props.taskReducer.isTaskDeleted ||
      props.taskReducer.isTaskEdited
    ) {
      handleLabel("all");
      setStatus("all");
      setDate(null);
      setStartDate("");
      setEndDate("");
      fetchData({
        status: "all",
        label: "all",
      });
    }
  }, [
    props.taskReducer.isTaskAdded,
    props.taskReducer.isTaskEdited,
    props.taskReducer.isTaskDeleted,
  ]);

  function onOk(value) {}

  return (
    <div className="filterPanel">
      <div className="dropdowns">
        <p>
          <FilterOutlined /> Category and Status
        </p>
        <Select
          style={{ width: 200, marginLeft: 10 }}
          placeholder="Select a Category"
          optionFilterProp="children"
          onChange={(value) => {
            handleLabel(value);
            const obj1 = {
              status: status,
              label: value,
            };
            const obj2 = {
              status: status,
              label: value,
              startDate: startDate,
              endDate: endDate,
            };
            fetchData(startDate === "" && endDate === "" ? obj1 : obj2);
          }}
          value={label}
        >
          <Option value="all" key="-1">
            All
          </Option>
          {props.auth.labels && props.auth.labels.length > 0
            ? props.auth.labels.map((item) => {
                return (
                  <Option value={item.label_value} key={item.label_id}>
                    {item.label_value}
                  </Option>
                );
              })
            : null}
        </Select>
        <Select
          style={{ width: 200, marginLeft: 10 }}
          placeholder="Select a status"
          optionFilterProp="children"
          onChange={(value) => {
            setStatus(value);
            const obj1 = {
              status: value,
              label: label,
            };
            const obj2 = {
              status: value,
              label: label,
              startDate: startDate,
              endDate: endDate,
            };
            fetchData(startDate === "" && endDate === "" ? obj1 : obj2);
          }}
          value={status}
        >
          <Option value="all" key="-1">
            All
          </Option>
          <Option value="pending" key="1">
            Pending
          </Option>
          <Option value="inprogress" key="2">
            Inprogress
          </Option>
          <Option value="completed" key="3">
            Completed
          </Option>
        </Select>
      </div>

      <div className="dropdowns margin">
        <p>
          <FilterOutlined /> Select Date Range {" "}
        </p>
        <RangePicker
          allowClear={false}
          style={{ width: 370, marginLeft: 10 ,height:34}}
          format="YYYY-MM-DD"
          onChange={onChange}
          onOk={() => {
            onOk();
          }}
          value={date}
        />
        <Tooltip title="Reload">
          <Button
            style={{ marginLeft: 10 }}
            type="primary"
            shape="circle"
            icon={<ReloadOutlined />}
            onClick={() => {
              handleLabel("all");
              setStatus("all");
              setDate(null);
              setStartDate("");
              setEndDate("");
              fetchData({
                status: "all",
                label: "all",
              });
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  taskReducer: state.taskReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: (parameters, token) =>
      dispatch(getAllTasks(parameters, token)),
  };
};

const FilterPanel = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterPanel;
