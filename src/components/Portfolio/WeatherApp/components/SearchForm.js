import React from 'react';

const SearchForm = ({
  refInput,
  placeholder,
  alert,
  city,
  setCity,
  fetchWeather,
}) => {
  return (
    <>
      <form onSubmit={(e) => fetchWeather(e)} className='search-form'>
        <input
          ref={refInput}
          type='text'
          placeholder={placeholder}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type='submit'>&#x1F50D;</button>
        <br />
      </form>
      {alert.show && <p className='alert'>{alert.message}</p>}
    </>
  );
};

export default SearchForm;
