import React from 'react'

function SearchHistory() {
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  return (
    <div classname="search-history"> 
      <h3>Recent Searches</h3>
      <ul>
        {recentSearches.map((search, index) => {
          return <li key={index}>{search}</li>
        })}
      </ul>
      </div>)  }
export default SearchHistory;
