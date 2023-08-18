import React from 'react';
import SearchBar from './utils/SearchBar';
import WeatherDisplay from './utils/WeatherDisplay';
import SearchHistory from './utils/SearchHistory';


function App() {
  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <SearchBar />
      <WeatherDisplay />
      <SearchHistory />
    </div>
  );
}

export default App;
