import React from "react";

export default ({ currentTemp, icons = [], high, low }) => {
  const renderIcons = icons.map((icon) => (
    <img
      key={icon}
      src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="weather icon"
    />
  ));
  return (
    <div className="weather">
      <div>{currentTemp}</div>
      <div>{renderIcons}</div>
      <div className="high">{high}</div>/<div className="low">{low}</div>
    </div>
  );
};
