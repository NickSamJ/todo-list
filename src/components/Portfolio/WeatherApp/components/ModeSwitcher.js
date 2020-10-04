import React from 'react';
import { CURRENT, FIVE_DAYS } from '../modes';

const ModeSwitcher = ({ setMode, mode, langData }) => {
  const handleButtonClick = (e, params) => {
    e.target.blur();
    setMode(params);
  };
  const getButton = (translate, params) => {
    const isActive = mode == params;
    return (
      <button
        className={`${params.buttonClass} ${isActive && 'active'}`}
        onClick={(e) => handleButtonClick(e, params)}
        disabled={isActive}
      >
        {translate}
      </button>
    );
  };
  return (
    <div className='mode-select'>
      {getButton(langData.translates.current, CURRENT)}
      {getButton(langData.translates.forecast, FIVE_DAYS)}
    </div>
  );
};

export default ModeSwitcher;
