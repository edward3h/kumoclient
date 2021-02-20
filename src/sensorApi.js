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
      weatherRes.map((x) => {
        return {
          currentTemp: Math.round(x.temperature),
          name: x.name,
          minutesAgo: x.last,
          humidity: x.humidity,
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
