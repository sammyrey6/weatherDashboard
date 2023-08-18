import React, { useState } from 'react'
import WeatherDisplay from './WeatherDisplay';
const apiKey = "672219b32b147adec9eec033265a04e7";

function SearchBar() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleSearch = async () =>{
        try{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            const data = await res.json();
            console.log(data);
            setWeatherData(data);

            const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
            recentSearches.unshift(city);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        } catch (err) {
            console.log(err);
        }
        // console.log(city);
        // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log(data);
        // }
        // );
    };

    return (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <WeatherDisplay weatherData={weatherData} />
        </div>
      );
    }

export default SearchBar;