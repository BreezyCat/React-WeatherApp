/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import clearImg from "./Assets/clear.png";
import cloudImg from "./Assets/cloud.png";
import rainImg from "./Assets/rain.png";
import snowImg from "./Assets/snow.png";
import drizzleImg from "./Assets/drizzle.png";

export default function App() {
  const [data, setData] = useState({
    celcius: null,
    location: null,
    feels: null,
    humidity: null,
    speed: null,
    weather: null,
  });
  const [location, setLocation] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [error, setError] = useState("");

  const weatherIconMap = {
    Clear: clearImg,
    Clouds: cloudImg,
    Rain: rainImg,
    Snow: snowImg,
    Drizzle: drizzleImg,
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=73b3afd9e429540975257f09293a0c3f`;
      axios
        .get(url)
        .then((response) => {
          setData({
            ...data,
            celcius: response.data.main.temp.toFixed(),
            location: response.data.name,
            humidity: response.data.main.humidity.toFixed(),
            speed: response.data.wind.speed.toFixed(),
            feels: response.data.main.feels_like.toFixed(),
            weather: response.data.weather[0].main,
          });

          if (response.data.weather && response.data.weather[0].main) {
            const weatherCondition = response.data.weather[0].main;
            setWeatherIcon(weatherIconMap[weatherCondition]);
          } else {
            setWeatherIcon("");
          }
          setError("");
        })
        .catch((error) => {
          setError("Location not found. Please enter a valid location.");
        });
      setLocation("");
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
  
      {data.location !== null && !error && (
        <div className="container">
          <div className="top">
            <div className="description">
              {weatherIcon && (
                <img src={weatherIcon} alt="" className="weather-icon" />
              )}
            </div>
  
            <div className="main">
              <div className="day">
                <p>Today</p>
              </div>
              <div className="location">
                <p>{data.location}</p>
              </div>
              <div className="temp">
                <p>Temperature: {data.celcius}°C</p>
                <p>{data.weather}</p>
              </div>
            </div>
          </div>
  
          <div className="bottom">
            <div className="feels">
              <p className="bold">{data.feels}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{data.speed} MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
  
      {error && <p className="error">{error}</p>}
    </div>
  );  
}
