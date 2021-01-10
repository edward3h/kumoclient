import React from "react";

const Sensors = ({ data }) => {
  const rows = data.map((row) => (
    <div className="weather" key={row.name}>
      <div className="name">{row.name}</div>
      <div className="temp">{row.currentTemp}</div>
    </div>
  ));

  return <>{rows}</>;
};

export default Sensors;
