import React from 'react';
import './SearchBar.css';

export const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value); 
  };

  return (
    <div className="barra-de-busqueda">
      <input 
        type="search"
        name="buscar"
        id="buscar"
        placeholder="Barra de búsqueda"
        className="searchbar"
        onChange={handleSearch} 
      />
    </div>
  );
};
