import React from 'react';
import './label.css'
function Label(props) {

  return (
    <div>
      <p className="text">{props.text}</p>
    </div>
  );
}

export default Label;