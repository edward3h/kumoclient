const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const cacheGet = async (key, loader) => {
  const now = Date.now();
  try {
    let item = localStorage.getItem(key);
    if (item) {
      item = JSON.parse(item);
      if (item.timestamp + CACHE_DURATION > now) {
        return item.value;
      }
    }
  } catch (error) {
    // ignore
  }
  const newValue = await loader.apply();
  const newItem = {
    value: newValue,
    timestamp: now,
  };
  localStorage.setItem(key, JSON.stringify(newItem));
  return newValue;
};

const WEATHER_CACHE_KEY = "weather";
const WEATHER_QUERY = {
  appid: process.env.REACT_APP_OPENWEATHER_ID,
  lat: process.env.REACT_APP_LAT,
  lon: process.env.REACT_APP_LON,
  exclude: "minutely,hourly",
  units: "imperial",
};
const WEATHER_URL = (() => {
  const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
  const params = new URLSearchParams(WEATHER_QUERY);
  url.search = params.toString();
  return url;
})();

const fetchWeather = async () => {
  const res = await fetch(WEATHER_URL);
  if (res.ok) {
    return await res.json();
  }
  throw new Error(res.status);
};

const convertWeather = (weatherRes) => {
  return {
    currentTemp: Math.round(weatherRes?.current?.temp),
    icons: weatherRes?.current?.weather?.map((x) => x?.icon),
    high: Math.round(weatherRes?.daily[0]?.temp?.max),
    low: Math.round(weatherRes?.daily[0]?.temp?.min),
  };
};

const getWeather = () => {
  return cacheGet(WEATHER_CACHE_KEY, () => fetchWeather().then(convertWeather));
};

export default getWeather;
