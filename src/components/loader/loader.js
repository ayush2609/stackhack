import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Loader() {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <div className="loaderContainer">
    <Spin indicator={antIcon} />
    </div>
  );
}

export default Loader;