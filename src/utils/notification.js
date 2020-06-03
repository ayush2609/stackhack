import { notification } from 'antd';

    export default  function notificationOpen  (data) {
         notification[data.type]({
            message: data.description,
            duration : 2
          }); 

    }
