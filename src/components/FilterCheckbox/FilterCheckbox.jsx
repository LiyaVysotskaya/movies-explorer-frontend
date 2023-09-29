import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <label className="switch">
      <input className="switch__input" type="checkbox" value={props.isChecked} onChange={props.handleChange} />
      <div className="swith__slider"></div>
      <span className="swith__text">{props.text}</span>
    </label>
  )
}

export default FilterCheckbox;