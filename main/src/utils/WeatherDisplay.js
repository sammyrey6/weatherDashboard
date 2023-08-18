import React from 'react';

function WeatherDisplay({ weatherData }) {
  return (
    <div className="weather-display">
      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Feels like: {weatherData.main.feels_like}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed}m/s</p>
            <p>Wind Direction: {weatherData.wind.deg}°</p>
        </div>
      ) : (
        <p>No weather other data available</p>
      )}
    </div>
    
  );
}


export default WeatherDisplay;
