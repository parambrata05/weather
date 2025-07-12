'use client';

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function CurrentWeather() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);

  const apiKey = '9d3af07884cffec8b62d02d8af614c25';

  const weatherIcons = {
    Clouds: '/images/clouds.png',
    Clear: '/images/clear.png',
    Drizzle: '/images/drizzle.png',
    Mist: '/images/mist.png',
    Rain: '/images/rain.png',
    Snow: '/images/snow.png',
  };

  const fetchWeather = async () => {
    if (!city.trim()) return alert('Please enter a city name.');

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
      );
      setData(response.data);
    } catch (error) {
      alert('City not found. Please try again.');
      setData(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') fetchWeather();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-cyan-700 to-cyan-300 rounded-3xl p-8 w-full max-w-md text-center shadow-xl">
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            placeholder="Enter city"
            className="flex-grow p-4 rounded-full text-black outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={fetchWeather}
            className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200"
          >
            <Image src="/images/search.png" alt="Search" width={20} height={20} />
          </button>
        </div>

        {data && (
          <>
            <Image
              src={weatherIcons[data.weather[0].main] || '/images/mist.png'}
              alt="Weather Icon"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h2 className="text-4xl font-bold">{data.main.temp}°C</h2>
            <h3 className="text-2xl mt-1 mb-4">{data.name}</h3>
            <div className="flex justify-between px-6 mt-6">
              <div className="flex items-center space-x-2">
                <Image src="/images/humidity.png" alt="Humidity" width={30} height={30} />
                <p>{data.main.humidity}%</p>
              </div>
              <div className="flex items-center space-x-2">
                <Image src="/images/wind.png" alt="Wind" width={30} height={30} />
                <p>{data.wind.speed} m/s</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
