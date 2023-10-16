import React from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  return (
    <div className="search">
      <div className="search__container">
        <div className="search__logo"></div>
        <form className="search__form" name="searchForm" onSubmit={props.onSubmit}>
          <input
            className="search__input"
            value={props.values.search}
            onChange={props.onChange}
            name="search"
            type="text"
            placeholder="Фильм"
            required
          />
          <button className="search__button" type="submit">Найти</button>
          <FilterCheckbox isChecked={props.values.isShort} onChange={props.onChange} />
        </form>
      </div>
    </div>
  )
}

export default SearchForm;