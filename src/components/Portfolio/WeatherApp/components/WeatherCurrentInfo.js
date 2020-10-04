import React from 'react';
import { CURRENT } from '../modes';
import { getWeatherIconUrl } from '../util';

const WeatherCurrentInfo = ({ weather, city }) => {
  const info = (
    <>
      {weather && (
        <div className='info'>
          <div className='info-top'>
            <h1>{weather.name || city}</h1>
            <img
              src={getWeatherIconUrl(weather.weather[0].icon)}
              alt={weather.weather[0].description}
            />
            <h2>{weather.main.temp.toFixed(1)}°</h2>
          </div>

          <span className='info=bottom'>{weather.weather[0].description}</span>
        </div>
      )}
    </>
  );
  return <>{info}</>;
};

export default WeatherCurrentInfo;
