import React  from 'react';
import { ClockCircleOutlined ,WarningOutlined , PushpinFilled} from '@ant-design/icons';
import './urgentTask.css'
import { Tag } from 'antd';
import { Timeline ,Rate } from 'antd';
import NoData from "../noData/noData"


function UrgentTask(props) { 

  let urgentTaskList = props.urgentTasks.map( item =>{
  return  <Timeline.Item color="red"style={{color:'white'}} key={item}>{item.task_name } { "    "}
   <Rate
          character={<PushpinFilled />}
          value={item.task_priority}
          style={{fontSize:12}}
          disabled
        />
  </Timeline.Item>
  })
  let overdueTasks = props.overdueTasks.map( item =>{
  return  <Timeline.Item color="grey"style={{color:'white'}} key="item">{item.task_name}{ "    "}
    <Rate
          character={<PushpinFilled />}
          value={item.task_priority}
          style={{fontSize:12}}
          disabled
        />
   </Timeline.Item>
    })

  return (
    <div className="urgentTaskContainer">
     <div className="containerItems urgent">
     <div className="Heading urgentText">
     <Tag icon={<ClockCircleOutlined />} color="error">
     Urgent Tasks
      </Tag>
     </div>
     <br />
     <Timeline>
     {props.urgentTasks.length > 0 ?
       urgentTaskList  : 
       <div className="noData">
     <NoData taskName="Urgent tasks"/> 
     </div>
     }
    </Timeline>
     </div>
     <div className="containerItems pinned">
     <div className="Heading pinnedText">
     <Tag icon={<WarningOutlined />} color="default">
        Overdue Tasks
      </Tag>
     </div>
     <br />
     <Timeline>
      { props.overdueTasks.length > 0 ? overdueTasks : 
       <div className="noData">
      <NoData taskName={'Overdue tasks'}/>
      </div>
      }
    </Timeline>
    </div>
    </div>
  );
}

export default UrgentTask;