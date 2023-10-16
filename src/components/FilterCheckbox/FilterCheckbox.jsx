import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <label className="switch">
      <input className="switch__input" name='isShort' type="checkbox" value={props.isChecked} onChange={props.onChange} />
      <span className="switch__slider"></span>
      <span className="switch__text">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;