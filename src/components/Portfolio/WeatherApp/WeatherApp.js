import React, { useState, useRef } from 'react';
import WeatherBanner from './components/WeatherBanner';
import './styles.scss';
import testData from './testData/test-current-weather';
import testForecastData from './testData/test-forecast.json';
import LanguageSwitcher from './components/LanguageSwitcher';
import { CURRENT, FIVE_DAYS } from './modes';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ModeSwitcher from './components/ModeSwitcher';
import WeatherCurrentInfo from './components/WeatherCurrentInfo';
import WeatherForecastInfo from './components/WeatherForecastInfo';
import languages from './languages.json';
import SearchForm from './components/SearchForm';
import LoadIndicator from './components/LoadIndicator';

const currWeatherBg = 'rgb(176 139 130)';
const fiveDaysWeatherBg = 'gray';
const initialAlert = { show: false, message: '' };

const tryGetLang = (language) => {
  return languages.find(
    (lang) => lang.lang_name.toUpperCase() === language.toUpperCase()
  );
};

const getDefaultLangData = () => {
  const langFromLocalStorage = localStorage.getItem('lang');
  const pastSessionLang =
    langFromLocalStorage && tryGetLang(langFromLocalStorage.toUpperCase());

  // Return the language data if Localstorage has contained correct value
  if (pastSessionLang) {
    return pastSessionLang;
  }

  const browserLang = navigator.language.toUpperCase();
  const size = browserLang.length;
  const lang = size > 2 ? browserLang.slice(size - 2, size) : browserLang;
  const langData = tryGetLang(lang);
  return langData ? langData : languages[0];
};
const defaultLangData = getDefaultLangData();

const WeatherApp = () => {
  // const [currentWeather, setCurrentWeather] = useState(testData);
  // const [currentWeather, setCurrentWeather] = useState(testForecastData);

  // State goes here
  const [currentWeather, setCurrentWeather] = useState();
  const [city, setCity] = useState('');
  const [alert, setAlert] = useState(initialAlert);
  const [loaderActive, setLoaderActive] = useState(false);
  const [langData, setLangData] = useState(defaultLangData);
  const [mode, setMode] = useState(CURRENT);

  const input = useRef();

  const resetWeather = () => {
    setCity('');
    setCurrentWeather(null);
  };

  const apiKey = process.env.REACT_APP_WEATHER;
  const getRequestUrl = () => {
    return `http://api.openweathermap.org/data/2.5/${
      mode === CURRENT ? 'weather' : 'forecast'
    }?q=${city}&lang=${langData.lang_name}&units=metric&appid=${apiKey}`;
  };

  const fetchWeather = async (e) => {
    setLoaderActive(true);
    e.preventDefault();
    if (city.trim()) {
      try {
        const response = await fetch(getRequestUrl());
        const weather = await response.json();
        if (weather.cod === '404') {
          setAlert({
            show: true,
            message: langData.translates.city_not_found,
          });
          setCurrentWeather(null);
          return;
        }
        setCurrentWeather(weather);
        setAlert(initialAlert);
      } catch (e) {
        console.log('==> ', e);
      } finally {
        setLoaderActive(false);
      }
    }
  };
  const handleMode = (newMode) => {
    setMode(newMode);
    resetWeather();
  };
  const handleLangData = (langName) => {
    resetWeather();
    localStorage.setItem('lang', langName);
    setLangData(
      languages.find(
        (lang) => lang.lang_name.toUpperCase() === langName.toUpperCase()
      )
    );
  };

  const bg = mode === CURRENT ? currWeatherBg : fiveDaysWeatherBg;

  return (
    <div className='weather'>
      <ModeSwitcher setMode={handleMode} mode={mode} langData={langData} />
      <TransitionGroup>
        <CSSTransition key={mode.name} timeout={1000} classNames='weather-mode'>
          <div style={{ background: bg }} className='weather-bg'></div>
        </CSSTransition>
      </TransitionGroup>
      <div className='content'>
        <LanguageSwitcher
          currentLangData={langData}
          handleLangData={handleLangData}
        />
        <WeatherBanner />
        <SearchForm
          refInput={input}
          placeholder={langData.translates.enter_city}
          city={city}
          setCity={setCity}
          fetchWeather={fetchWeather}
          alert={alert}
        />
        {loaderActive && <LoadIndicator />}

        {currentWeather &&
          (mode === CURRENT ? (
            <WeatherCurrentInfo weather={currentWeather} />
          ) : (
            <WeatherForecastInfo
              weather={currentWeather}
              langData={langData}
              city={city}
            />
          ))}
      </div>
    </div>
  );
};

export default WeatherApp;
