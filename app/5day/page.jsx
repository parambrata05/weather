'use client';

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function FiveDayForecast() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);

  const apiKey = '9d3af07884cffec8b62d02d8af614c25';

  const checkWeather = async () => {
    if (!city.trim()) return alert('Please enter a city name.');

    try {
      const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
      const response = await axios.get(apiURL);
      const forecastList = response.data.list.filter(entry =>
        entry.dt_txt.includes('12:00:00')
      );

      const extracted = forecastList.slice(0, 5).map((entry) => ({
        date: new Date(entry.dt_txt).toDateString(),
        temp: `${entry.main.temp}°C`,
      }));

      setForecast(extracted);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('City not found. Please try again.');
      setForecast([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') checkWeather();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4 font-serif">
      <div className="w-full max-w-md mb-10">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter city"
            className="flex-grow p-4 rounded-full bg-white text-black outline-none text-lg"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={checkWeather}
            className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200"
          >
            <Image
              src="/images/search.png"
              alt="Search"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gradient-to-br from-cyan-700 to-cyan-300 rounded-xl p-6 w-full max-w-xs text-center shadow-lg"
          >
            <div className="text-xl font-bold mb-2">{day.date}</div>
            <div className="text-lg font-semibold">{day.temp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
