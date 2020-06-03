import React from "react";
import "./noData.css";

function NoData(props) {

  return (
    <div className="nodata1">
        <img className="nodataImg" src={require('../../assests/nodata.png')} alt="No Tasks Created" />
        <br />
        <p>No {props.taskName}!</p>
    </div>
  );
}

export default NoData;
