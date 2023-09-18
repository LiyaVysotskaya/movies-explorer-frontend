import React from "react";
import './SecondaryHeader.css';

function SecondaryHeader(props) {
  return (
    <div className='secondary-header'>
      <h2 className='secondary-header__title'>{props.title}</h2>
    </div>
  )
}

export default SecondaryHeader;