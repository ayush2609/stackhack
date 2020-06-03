import React from 'react';
import './input.css'

function InputBox(props) {

  return (
    <div>
      <input  className="input" value={props.value} type={props.type} placeholder={props.placeholder} name={props.name} onChange={(event) => {props.changeHandler(event)}}/> 
    </div>
  );
}

export default InputBox;