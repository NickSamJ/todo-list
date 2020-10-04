import React from 'react';
import { ReactComponent as Weather } from '../images/weather-woman-prepared.svg';

const WeatherBanner = (props) => {
  return (
    <div className='weather-banner'>
      <Weather />
    </div>
  );
};

export default WeatherBanner;
