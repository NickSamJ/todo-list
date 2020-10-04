import React, { useState } from 'react';
import TimeLine from './TimeLine';
import { daysOfWeek, getWeatherIconUrl } from '../util';
import WeatherCurrentInfo from './WeatherCurrentInfo';

const WeatherForecastInfo = ({ weather, langData, city }) => {
  const [currentWeather, setCurrentWeather] = useState(weather.list[0]);
  const [currentDay, setcurrentDay] = useState(0);

  const daysStats = weather.list.reduce((sum, curr, index) => {
    const currSlot = Math.floor(index / 8);
    const newSum = JSON.parse(JSON.stringify(sum));

    const getMin = () => {
      let sumMin = newSum[currSlot].min_temp;
      const currMin = curr.main.temp_min;
      if (sumMin) {
        return sumMin > currMin ? currMin : sumMin;
      } else {
        return (sumMin = currMin);
      }
    };

    const getMax = () => {
      let sumMax = newSum[currSlot].max_temp;
      const currMax = curr.main.temp_max;
      if (sumMax) {
        return sumMax < currMax ? currMax : sumMax;
      } else {
        return (sumMax = currMax);
      }
    };
    newSum[currSlot].min_temp = getMin();
    newSum[currSlot].max_temp = getMax();

    return newSum;
  }, new Array(5).fill({}));

  const days = weather.list.reduce((sum, curr, index) => {
    if (index % 8 === 0) {
      sum.push(curr);
    }
    return sum;
  }, []);

  const handleDayWeather = (dayIndex) => {
    setcurrentDay(dayIndex);
    setCurrentWeather(weather.list[dayIndex * 8]);
  };
  const getDayCard = (dayInfo, dayIndex) => {
    const dateData = new Date(dayInfo.dt * 1000);
    // const dayOfWeek = daysOfWeek[dateData.getDay()];
    const dateOfWeekFormatter = new Intl.DateTimeFormat(langData.lang_name, {
      weekday: 'long',
    });
    const dayOfWeek = dateOfWeekFormatter.format(dateData);
    // const date = dateData.toLocaleDateString();
    const isActive = currentDay === dayIndex;

    return (
      <div
        className={`day-card ${isActive ? 'active' : ''}`}
        onClick={() => handleDayWeather(dayIndex)}
      >
        <img src={getWeatherIconUrl(dayInfo.weather[0].icon)} alt='' />
        <p className='week-day'>{dayOfWeek}</p>
        <span className='max-temp'>
          🌞 {daysStats[dayIndex].max_temp.toFixed(1)}°
        </span>
        <span className='min-temp'>
          🌑 {daysStats[dayIndex].min_temp.toFixed(1)}°
        </span>
        {/* <p>{date}</p> */}
      </div>
    );
  };
  const dayCards = days.map((day, dayIndex) => {
    return getDayCard(day, dayIndex);
  });
  return (
    <div className='forecast-info'>
      <WeatherCurrentInfo weather={currentWeather} city={weather.city.name} />
      <div className='day-cards'>{dayCards}</div>
      <TimeLine
        currentDay={currentDay}
        weather={weather}
        langData={langData}
        currentWeather={currentWeather}
        setCurrentWeather={setCurrentWeather}
      />
      {/* <input type='range' min /> */}
    </div>
  );
};

export default WeatherForecastInfo;
