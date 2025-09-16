import React, { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // 🔑 Replace this with your actual OpenWeatherMap API key
  const API_KEY = "your_api_key_here";

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("City not found");
        } else if (res.status === 401) {
          throw new Error("Invalid API key");
        } else {
          throw new Error("Failed to fetch weather");
        }
      }

      const data = await res.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        display: "flex",
        justifyContent: "center",
        paddingTop: 60,
      }}
    >
      <div style={{ width: 360, textAlign: "center" }}>
        <h1>🌦 Weather App</h1>

        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          placeholder="Enter city..."
          style={{
            width: "100%",
            padding: 10,
            fontSize: "1.3em",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={fetchWeather}
          style={{
            marginTop: 12,
            width: "50%",
            fontSize: "1.3em",
            padding: 10,
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Get Weather
        </button>

        {error && (
          <p style={{ color: "crimson", marginTop: 12, fontSize: "1.1em" }}>
            {error}
          </p>
        )}

        {weather && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 8,
              background: "#f3f3f3",
              fontSize: "1.2em",
              textAlign: "left",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {weather.name}, {weather.sys?.country}
            </div>
            <div>🌡 {weather.main?.temp} °C</div>
            <div>☁ {weather.weather?.[0]?.description}</div>
            <div>💨 {weather.wind?.speed} m/s</div>
            <div>💧 Humidity: {weather.main?.humidity}%</div>
          </div>
        )}
      </div>
    </div>
  );
}
