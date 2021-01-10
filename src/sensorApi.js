// calls the API https://github.com/alex-konshin/f007th-rpi/wiki/REST-API for temperature sensors
import _ from "lodash";

const fetchData = async () => {
  const res = await fetch(process.env.REACT_APP_SENSOR_URL);
  if (res.ok) {
    return await res.json();
  }
  throw new Error(res.status);
};

const convertData = (weatherRes) => {
  if (weatherRes) {
    return _.sortBy(
      Object.entries(weatherRes).map(([k, v]) => {
        return {
          currentTemp: Math.round(v / 10),
          name: k,
        };
      }),
      ["name"]
    );
  }
  return [];
};

const getData = () => {
  return fetchData().then(convertData);
};

export default getData;
