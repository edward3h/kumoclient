import React from "react";
import Button from "./Button";
import HeaderContainer from "./HeaderContainer";

const heatOptions = [62, 65, 68];
const coolOptions = [69, 72, 75, 78];

const TempButtons = ({ onButtonClick, title, tempOptions, selectedValue }) => {
  return (
    <HeaderContainer title={title}>
      {tempOptions.map((value) => (
        <Button
          key={value}
          label={value}
          selected={value === selectedValue}
          onClick={() => onButtonClick(value)}
        />
      ))}
    </HeaderContainer>
  );
};

const Controls = ({
  sendUpdate,
  modes,
  currentTemp,
  heatTemp,
  coolTemp,
  enabled,
}) => {
  const partial = modes.size > 1;
  const disabledClass = enabled ? "" : "disabled";
  let tempOptions = heatOptions;
  let tempTitle = "Heat";
  let tempOnClick = (value) => sendUpdate({ heatTemp: value });
  let tempCurrent = heatTemp;

  if (modes.has("cool") || (!modes.has("heat") && currentTemp > 71)) {
    tempOptions = coolOptions;
    tempTitle = "Cool";
    tempCurrent = coolTemp;
    tempOnClick = (value) => sendUpdate({ coolTemp: value });
  }
  return (
    <div className={`controls ${disabledClass}`}>
      <HeaderContainer title="Mode">
        <Button
          label="Off"
          onClick={() => sendUpdate({ mode: "off" })}
          selected={modes.has("off")}
          partial={partial}
        />
        <Button
          label="Heat"
          onClick={() => sendUpdate({ mode: "heat" })}
          selected={modes.has("heat")}
          partial={partial}
        />
        <Button
          label="Cool"
          onClick={() => sendUpdate({ mode: "cool" })}
          selected={modes.has("cool")}
          partial={partial}
        />
        <Button
          label="Fan"
          onClick={() => sendUpdate({ mode: "vent" })}
          selected={modes.has("vent")}
          partial={partial}
        />
      </HeaderContainer>
      <TempButtons
        selectedValue={tempCurrent}
        title={tempTitle}
        tempOptions={tempOptions}
        onButtonClick={tempOnClick}
      />
    </div>
  );
};

export default Controls;
