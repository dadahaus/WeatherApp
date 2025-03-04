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
  // Function to reset settings to default values
  const resetDefaults = () => {
    onTemperatureUnitChange("celsius");
    onTextSizeChange("normal");
    onBrightnessChange(50);
  };

  const SoundSettings = () => {
    // Initialize soundEffects state to true (on by default)
    const [soundEffects, setSoundEffects] = useState(true);

    // Toggle function to switch between on and off
    const onSoundEffectsToggle = (value) => {
      setSoundEffects(value); // Set the state to the selected value
    };
  }

  return (
    <div className="settings-modal">
      {/* Back Button */}

      <div className="settings-content">

        <div className="setting-header">
          <button className="back-btn" onClick={onClose}>
            Back
          </button>
          <h3> <strong>Settings</strong></h3 >
          {/* Reset Default Button */}
          <div className="setting-section">
            <button className="reset-btn" onClick={resetDefaults}>
              Reset Default
            </button>
          </div>
        </div>



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
              type="radio"
              name="soundEffects" // Group radio buttons by name
              checked={soundEffects === true} // Checked if soundEffects is true
              onChange={() => onSoundEffectsToggle(true)} // Set to true when clicked
            />
            On
          </label>
          <label>
            <input
              type="radio"
              name="soundEffects" // Group radio buttons by name
              checked={soundEffects === false} // Checked if soundEffects is false
              onChange={() => onSoundEffectsToggle(false)} // Set to false when clicked
            />
            Off
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





        {/* About Section */}
        <div className="about-section">
          <h2>About</h2>
          <div className="about-page">
            <h4>
              <strong>Weather Time</strong>
            </h4>
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