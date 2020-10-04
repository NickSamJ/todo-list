import React from 'react';
import _ from 'lodash';
import TimeBox from './TimeBox';

const timeOptions = { hour: '2-digit', minute: '2-digit' };

const TimeLine = ({
  currentDay,
  weather,
  setCurrentWeather,
  currentWeather,
}) => {
  const timeBoxes = _.range(currentDay * 8, (currentDay + 1) * 8).map(
    (index) => {
      const handleClick = () => {
        setCurrentWeather(weather.list[index]);
      };
      const isActive =
        JSON.stringify(currentWeather) === JSON.stringify(weather.list[index]);
      const date = new Date(weather.list[index].dt * 1000);
      const time = '' + date.toLocaleTimeString([], timeOptions);

      return (
        <TimeBox
          time={time}
          active={isActive}
          handleClick={() => handleClick()}
        />
      );
    }
  );
  return <div className='timeline'>{timeBoxes}</div>;
};

export default TimeLine;
