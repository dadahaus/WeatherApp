import React from "react";
import "./settings.css";

const Settings = ({
  temperatureUnit,
  onTemperatureUnitChange,
  textSize,
  onTextSizeChange,
  soundEffects,
  onSoundEffectsToggle,
  brightnessLevel,
  onBrightnessChange,
  onClose,
}) => {
  return (
    <div className="settings-modal">
      <div className="settings-content">
        <h2>Settings</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {/* Temperature Unit */}
        <div className="setting-section">
          <h3>Temperature Unit</h3>
          <label>
            <input
              type="radio"
              value="celsius"
              checked={temperatureUnit === "celsius"}
              onChange={() => onTemperatureUnitChange("celsius")}
            />
            Celsius
          </label>
          <label>
            <input
              type="radio"
              value="fahrenheit"
              checked={temperatureUnit === "fahrenheit"}
              onChange={() => onTemperatureUnitChange("fahrenheit")}
            />
            Fahrenheit
          </label>
        </div>

        {/* Text Size */}
        <div className="setting-section">
          <h3>Text Size</h3>
          <label>
            <input
              type="radio"
              value="normal"
              checked={textSize === "normal"}
              onChange={() => onTextSizeChange("normal")}
            />
            Normal
          </label>
          <label>
            <input
              type="radio"
              value="large"
              checked={textSize === "large"}
              onChange={() => onTextSizeChange("large")}
            />
            Large
          </label>
          <label>
            <input
              type="radio"
              value="extra-large"
              checked={textSize === "extra-large"}
              onChange={() => onTextSizeChange("extra-large")}
            />
            Extra Large
          </label>
        </div>

        {/* Sound Effects */}
        <div className="setting-section">
          <h3>Sound Effects</h3>
          <label>
            <input
              type="checkbox"
              checked={soundEffects}
              onChange={onSoundEffectsToggle}
            />
            {soundEffects ? "On" : "Off"}
          </label>  
        </div>

        {/* Brightness Level */}
        <div className="setting-section">
          <h3>Brightness Level</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={brightnessLevel}
            onChange={(e) => onBrightnessChange(e.target.value)}
          />
          <span>{brightnessLevel}%</span>
        </div>
          {/* Include About content at the bottom */}
          <div className="about-section">
          <h3>About</h3>
          <div className="about-page">
      <h1><strong>Weather Time</strong></h1>
      <p>Copyright © 2023 Weather Time. All rights reserved.</p>
      <p>Version: 1.0</p>
      <p>Last Update: </p>
      <p>Build Date: </p>
      <p>Developer: </p>
      <p>Student Number: </p>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;