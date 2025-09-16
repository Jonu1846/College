import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  // Dummy weather data
  const weatherData = {
    Bangalore: { temp: 28, desc: "Sunny" },
    Chennai: { temp: 32, desc: "Hot and Humid" },
    Delhi: { temp: 25, desc: "Cloudy" },
    Mumbai: { temp: 30, desc: "Rainy" },
  };

  const findWeather = () => {
    if (city) {
      setWeather(weatherData[city]);
    } else {
      setWeather(null);
      alert("Please select a city!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Weather Finder App</h2>

      {/* Dropdown to choose city */}
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">-- Select a City --</option>
        {Object.keys(weatherData).map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>
      <br /><br />

      <button onClick={findWeather}>Find Weather</button>

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>Temperature: {weather.temp}°C</h3>
          <p>Condition: {weather.desc}</p>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
export default App;