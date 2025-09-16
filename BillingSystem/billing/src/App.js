import React, { useState } from "react";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [query, setQuery] = useState("");
  const [units, setUnits] = useState("metric"); // "metric" or "imperial"
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchWeather(city) {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 404) throw new Error("City not found.");
        throw new Error("Failed to fetch weather.");
      }
      const data = await res.json();
      setWeather(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchWeather(query.trim());
  }

  function toggleUnits() {
    setUnits((prev) => (prev === "metric" ? "imperial" : "metric"));
  }

  return (
    <div>
      <h1>Weather Finder</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={toggleUnits}>
          Switch to {units === "metric" ? "°F" : "°C"}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>{weather.weather[0].description}</p>
          <p>
            Temperature:{" "}
            {units === "metric"
              ? `${weather.main.temp.toFixed(1)} °C`
              : `${((weather.main.temp * 9) / 5 + 32).toFixed(1)} °F`}
          </p>
          <p>
            Feels like:{" "}
            {units === "metric"
              ? `${weather.main.feels_like.toFixed(1)} °C`
              : `${((weather.main.feels_like * 9) / 5 + 32).toFixed(1)} °F`}
          </p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
