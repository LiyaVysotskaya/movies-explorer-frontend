import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <label className="switch">
      <input className="switch__input" type="checkbox" value={props.isChecked} onChange={props.handleChange} />
      <div className="switch__slider"></div>
      <span className="switch__text">{props.text}</span>
    </label>
  )
}

export default FilterCheckbox;