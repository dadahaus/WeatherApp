import React, { useState, useEffect } from "react";
import "./AddCity.css";

const AddCity = ({ onSelectCity, onCancel }) => {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCities("a"); // Cargar lista inicial con una consulta válida
  }, []);

  const fetchCities = async (query) => {
    if (!query) return;
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      setCities(data || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleSelectCity = (city) => {
    onSelectCity(`${city.name}, ${city.country}`);
  };

  return (
    <div className="add-city-container">
      <div className="header">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchCities(e.target.value);
          }}
        />
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>

      <ul className="city-list">
        {cities.length > 0 ? (
          cities.map((city, index) => (
            <li key={index} onClick={() => handleSelectCity(city)}>
              {city.name}, {city.country}
            </li>
          ))
        ) : (
          <li className="no-results">No cities found</li>
        )}
      </ul>
    </div>
  );
};

export default AddCity;
