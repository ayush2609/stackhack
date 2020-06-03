import React from 'react';
import './taskStats.css'
import { Row, Col } from 'antd';



function TaskStats(props) {
  return (
    <div className="site-statistic-demo-card stats">
    <div className="statsMain">
      <Col span={8} >
        <div className="statsCard completed">
         <img className="icon" src={require('../../assests/tick.webp')} alt={props.stats[0].status} />
         <div className="statsText">
         <p>{props.stats[0].status} </p>
          <p> {props.stats[0].count} Task</p>
          </div>
        </div>
      </Col>
      <Col span={8}>
      <div className="statsCard progress">
      <img className="icon" src={require('../../assests/play.svg')} alt={props.stats[1].status}/>
      <div className="statsText">
          <p>{props.stats[1].status} </p>
          <p> {props.stats[1].count} Task</p>
          </div>
        </div>
      </Col>
      <Col span={8}>
      <div className="statsCard pending">
      <img className="icon" src={require('../../assests/warning.webp')} alt={props.stats[2].status}/>
      <div className="statsText">
          <p>{props.stats[2].status} </p>
          <p> {props.stats[2].count} Task</p>
          {/* <p>Progress</p>
          <p>5 Task</p> */}
          </div>
        </div>
      </Col>
    </div>
  </div>
  );
}

export default TaskStats