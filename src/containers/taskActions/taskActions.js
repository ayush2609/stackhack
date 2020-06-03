import React from 'react';
import './taskAction.css'
import TaskStats from '../../components/taskStats/taskStats';
import AddTask from '../../components/addTask/addTask'
import UrgentTask from '../../components/urgentTask/urgentTask';

function TaskActions(props) {

  return (
    <div className="taskActionContainer">
        <TaskStats stats={props.auth.stats}/>  
        <br /> 
        <AddTask /> 
        <br />
        <UrgentTask urgentTasks={props.auth.urgentTasks}  overdueTasks={props.auth.overdueTasks}/>
    </div>
  );
}

export default TaskActions;