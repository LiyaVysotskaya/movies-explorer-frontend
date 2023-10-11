import React from "react";

function Input(props) {
  return (
    <label className="auth__label">
      <span className="auth__text">{props.inputName}</span>
      <input
        className={`auth__input ${props.error.email && 'auth__input_invalid'}`}
        value={props.value}
        onChange={props.onChange}
        error={props.error}
        name={props.name}
        type={props.type}
        minLength={props.minLength}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        required
      />
      <span className={`auth__input-error  ${props.error.email && 'auth__input-error_active'}`}>{props.error.email}</span>
    </label>
  )
}

export default Input;
