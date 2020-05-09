import React from "react";
import Button from "./Button";
import Number from "./Number";
import HeaderContainer from "./HeaderContainer";

const Controls = ({ sendUpdate, modes, heatTemp, coolTemp }) => {
  const partial = modes.size > 1;
  return (
    <div className="controls">
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
      </HeaderContainer>
      <div className="numbers">
        <Number
          title="Heat"
          value={heatTemp}
          onChange={(value) => sendUpdate({ heatTemp: value })}
        />
        <Number
          title="Cool"
          value={coolTemp}
          onChange={(value) => sendUpdate({ coolTemp: value })}
        />
      </div>
    </div>
  );
};

export default Controls;
