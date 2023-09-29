import React from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  return (
    <section className="search">
      <div className="search__container">
        <div className="search__logo"></div>
        <form className="search__form" name="searchForm" onSubmit={props.onSubmit}>
          <input
            className="search__input"
            // value={props.values.search}
            // onChange={props.handleChange}
            name="search"
            type="text"
            placeholder="Фильм"
            required
            noValidate
          />
          <button className="search__button" type="submit">Найти</button>
        </form>
        <FilterCheckbox text='Короткометражки' />
      </div>
    </section>
  )
}

export default SearchForm;