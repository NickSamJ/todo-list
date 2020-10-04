import React from 'react';

const TimeBox = ({ handleClick, time, active }) => {
  return (
    <div className={`timebox ${active ? 'active' : ''}`} onClick={handleClick}>
      {time}
    </div>
  );
};

export default TimeBox;
