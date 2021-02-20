import React from "react";

const Sensors = ({ data }) => {
  const rows = data.map((row) => (
    <>
      <div className="name">{row.name}</div>
      <div className="temp">{row.currentTemp}</div>
      <div className="humidity">{row.humidity}%</div>
      <div className="ago">{row.minutesAgo} min</div>
    </>
  ));

  return <>{rows}</>;
};

export default Sensors;
