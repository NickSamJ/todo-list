import React from 'react';
import languages from '../languages.json';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

const LanguageSwitcher = ({ currentLangData, handleLangData }) => {
  const langOptions = languages.map((lang) => {
    const icon = lang.data.icon_code;
    const lang_code = lang.lang_name.toUpperCase();
    return (
      <option key={lang_code} value={lang_code}>
        {getUnicodeFlagIcon(icon)}
      </option>
    );
  });

  return (
    <select
      className='lang-select'
      value={currentLangData.lang_name.toUpperCase()}
      onChange={(e) => handleLangData(e.target.value)}
    >
      {langOptions}
    </select>
  );
};

export default LanguageSwitcher;
