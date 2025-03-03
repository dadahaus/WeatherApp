import React, { useState } from "react";
import "./Weather.css";
import settings_icon from "../assets/settings.png";
import add_icon from "../assets/add.png";
import AddCity from "./AddCity";
import Settings from "./Settings";
import About from "./About"; // Import the About component

const Weather = () => {
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [showAddCity, setShowAddCity] = useState(false);
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [textSize, setTextSize] = useState("normal");
  const [soundEffects, setSoundEffects] = useState(true);
  const [brightnessLevel, setBrightnessLevel] = useState(50);

  // Fetch weather data (unchanged)
  const fetchWeather = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData((prev) => ({
          ...prev,
          [city]: {
            name: data.name,
            country: data.sys.country,
            temperature: Math.floor(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            description: data.weather[0].description,
            date: new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            time: new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Add city (unchanged)
  const addCity = (city) => {
    if (!cities.includes(city)) {
      const updatedCities = [...cities, city];
      setCities(updatedCities);
      fetchWeather(city);
    }
    setShowAddCity(false);
  };

  // Remove city (unchanged)
  const removeCity = (city) => {
    const updatedCities = cities.filter((c) => c !== city);
    setCities(updatedCities);
    setWeatherData((prev) => {
      const newData = { ...prev };
      delete newData[city];
      return newData;
    });
  };

  // Convert temperature based on unit
  const convertTemperature = (temp) => {
    if (temperatureUnit === "fahrenheit") {
      return Math.floor((temp * 9) / 5 + 32);
    }
    return temp;
  };

  // Apply text size class to the app
  const getTextSizeClass = () => {
    switch (textSize) {
      case "large":
        return "text-large";
      case "extra-large":
        return "text-extra-large";
      default:
        return "text-normal";
    }
  };

  // Apply brightness level to the app
  const applyBrightness = () => ({
    filter: `brightness(${brightnessLevel}%)`,
  });

  return (
    <div className={`weather-app ${getTextSizeClass()}`} style={applyBrightness()}>
      {!showAddCity ? (
        <>
          <div className="header">
            <button className="settings-btn" onClick={() => setShowSettingsPage(true)}>
              <img src={settings_icon} alt="Settings" />
            </button>
            <h1>Weather Time</h1>
            <button className="add-btn" onClick={() => setShowAddCity(true)}>
              <img src={add_icon} alt="Add City" />
            </button>
          </div>

          <div className="main">
            {cities.length === 0 ? (
              <>
                <h2>Welcome to Weather Time!</h2>
                <p>➕ Press this to add cities from around the world to view their date, time, and weather.</p>
                <p>⚙️ Press this for settings.</p>
              </>
            ) : (
              <div className="city-list">
                {cities.map((city) => (
                  <div
                    key={city}
                    className="city-card"
                    onTouchStart={(e) => (e.currentTarget.dataset.startX = e.touches[0].clientX)}
                    onTouchEnd={(e) => {
                      const startX = parseFloat(e.currentTarget.dataset.startX);
                      const endX = e.changedTouches[0].clientX;
                      if (startX - endX > 50) {
                        removeCity(city);
                      }
                    }}
                  >
                    <div className="city-header d-flex justify-content-between align-items-center">
                      <h3>{weatherData[city]?.name}, {weatherData[city]?.country}</h3>
                      <button className="delete-btn" onClick={() => removeCity(city)}>
                        Delete
                      </button>
                    </div>
                    <p className="time">{weatherData[city]?.time}</p>
                    <p className="date">{weatherData[city]?.date}</p>
                    <img src={weatherData[city]?.icon} alt="Weather Icon" />
                    <p className="temperature">
                      {convertTemperature(weatherData[city]?.temperature)}°
                      {temperatureUnit === "celsius" ? "C" : "F"}
                    </p>
                    <p className="description">{weatherData[city]?.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <AddCity onSelectCity={addCity} onCancel={() => setShowAddCity(false)} />
      )}

      {/* Render Settings component */}
      {showSettingsPage && (
        <Settings
          temperatureUnit={temperatureUnit}
          onTemperatureUnitChange={setTemperatureUnit}
          textSize={textSize}
          onTextSizeChange={setTextSize}
          soundEffects={soundEffects}
          onSoundEffectsToggle={setSoundEffects}
          brightnessLevel={brightnessLevel}
          onBrightnessChange={setBrightnessLevel}
          onClose={() => setShowSettingsPage(false)}
        />
      )}
    </div>
  );
};

export default Weather;