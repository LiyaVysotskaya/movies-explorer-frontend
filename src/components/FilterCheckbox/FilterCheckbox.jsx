import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <label className="switch">
      <input className="switch__input" type="checkbox" value={props.isChecked} onChange={props.handleChange} />
      <span className="switch__slider"></span>
      <span className="switch__text">{props.text}</span>
    </label>
  )
}

export default FilterCheckbox;