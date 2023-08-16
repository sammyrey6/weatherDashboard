import React from 'react';
import SearchBar from './utils/SearchBar';
import WeatherDisplay from './utils/WeatherDisplay';


function App() {
  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <SearchBar />
      <WeatherDisplay />
    </div>
  );
}

export default App;
