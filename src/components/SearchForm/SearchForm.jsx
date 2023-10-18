import React from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [searchValues, setSearchValues] = React.useState({ search: '', isShort: false });

  React.useEffect(() => {
    setSearchValues(props.initialValues);
  }, [props.initialValues])

  const onFilterChange = (e) => {
    const { name, value, checked } = e.target;
    const isCheckbox =  e.target.hasOwnProperty('checked');
    const newSearchValues = { ...searchValues, [name]: isCheckbox ? checked : value };
    setSearchValues(newSearchValues);
    if (isCheckbox) {
      props.onSubmit(newSearchValues);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(searchValues);
  }

  return (
    <div className="search">
      <div className="search__container">
        <div className="search__logo"></div>
        <form className="search__form" name="searchForm" onSubmit={onSubmit}>
          <input
            className="search__input"
            value={searchValues.search}
            onChange={onFilterChange}
            name="search"
            type="text"
            placeholder="Фильм"
            required
          />
          <button className="search__button" type="submit">Найти</button>
          <FilterCheckbox isChecked={searchValues.isShort} onChange={onFilterChange} />
        </form>
      </div>
    </div>
  )
}

export default SearchForm;