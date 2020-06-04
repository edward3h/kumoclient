import React, { useState, useEffect } from "react";
import Table from "./Table";
import kumoApi from "./kumoApi";
import useInterval from "./useInterval";
import isEqual from "lodash/isEqual";
import Controls from "./Controls";
import HeaderContainer from "./HeaderContainer";
import getWeather from "./weatherApi";
import Weather from "./Weather";

const selectedRoomAverages = (selectedRooms, roomData) => {
  const modes = new Set();
  let currentTemp = 0;
  let heatTemp = 0;
  let coolTemp = 0;
  if (!selectedRooms || selectedRooms.size === 0 || !roomData) {
    return [modes, heatTemp, coolTemp];
  }

  // yup I tried a couple of ways of implementing it in functional style then decided imperative was easier
  let heatSum = 0,
    heatCount = 0,
    coolSum = 0,
    coolCount = 0,
    currentSum = 0,
    currentCount = 0;

  selectedRooms.forEach((name) => {
    const rs = roomData[name];
    if (rs) {
      if (rs.mode) {
        modes.add(rs.mode);
      }
      if (rs.heatTemp) {
        heatSum += rs.heatTemp;
        heatCount += 1;
      }
      if (rs.coolTemp) {
        coolSum += rs.coolTemp;
        coolCount += 1;
      }
      if (rs.temp) {
        currentSum += rs.temp;
        currentCount += 1;
      }
    }
  });

  if (heatCount > 0) {
    heatTemp = Math.round(heatSum / heatCount);
  }

  if (coolCount > 0) {
    coolTemp = Math.round(coolSum / coolCount);
  }

  if (currentCount > 0) {
    currentTemp = Math.round(currentSum / currentCount);
  }
  return [modes, currentTemp, heatTemp, coolTemp];
};

function App() {
  const [roomNames, setRoomNames] = useState([]);
  const [roomData, setRoomData] = useState({});
  const [selectedRooms, setSelected] = useState(new Set());
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0); // counter used to force updates in some cases
  const [weatherData, setWeatherData] = useState({});

  // trigger a status update every so often
  useInterval(() => setTrigger((x) => x + 1), 60 * 1000);

  // get room names
  useEffect(() => {
    setRoomsLoading(true);

    kumoApi
      .getRooms()
      .then(setRoomNames)
      .catch((error) => setError(error))
      .finally(() => setRoomsLoading(false));
  }, []); // should never change after load

  // get room statuses
  useEffect(() => {
    const updateRoomData = (name, data) => {
      setRoomData((oldObj) => {
        const newObj = { ...oldObj };
        newObj[name] = data;
        return newObj;
      });
    };
    const getRoomStatus = (name) => {
      updateRoomData(name, { loading: true });

      kumoApi
        .getRoomStatus(name)
        .then((data) => updateRoomData(name, data))
        .catch((error) => updateRoomData(name, { error }));
      // don't need to unset loading, it is effectively removed by the result or error cases above
    };
    roomNames.forEach(getRoomStatus);
  }, [roomNames, trigger]); // update based on roomNames or when triggered

  // update weather
  useEffect(() => {
    getWeather().then((data) => setWeatherData(data));
  }, [trigger]);

  const toggleSelectedRoom = (name) => {
    const newValue = new Set(selectedRooms);
    if (newValue.has(name)) {
      newValue.delete(name);
    } else {
      newValue.add(name);
    }
    setSelected(newValue);
  };

  const toggleSelectAll = () => {
    const nameSet = new Set(roomNames);
    if (isEqual(nameSet, selectedRooms)) {
      setSelected(new Set());
    } else {
      setSelected(nameSet);
    }
  };

  const dispatchUpdate = (message) => {
    const promises = [];
    selectedRooms.forEach((name) => {
      if (message.mode) {
        promises.push(kumoApi.setRoomMode(name, message.mode));
      }
      if (message.heatTemp) {
        promises.push(kumoApi.setRoomHeat(name, message.heatTemp));
      }
      if (message.coolTemp) {
        promises.push(kumoApi.setRoomCool(name, message.coolTemp));
      }
    });
    Promise.all(promises).then(() =>
      setTimeout(() => setTrigger((x) => x + 1), 1000)
    );
  };

  const [modes, currentTemp, heatTemp, coolTemp] = selectedRoomAverages(
    selectedRooms,
    roomData
  );

  return (
    <div className="App">
      <HeaderContainer title="Heat Controls">
        <Table
          loading={roomsLoading}
          error={error}
          rooms={roomNames}
          selectedRooms={selectedRooms}
          onSelect={toggleSelectedRoom}
          roomStatus={roomData}
          onSelectAll={toggleSelectAll}
        />
        <Controls
          sendUpdate={dispatchUpdate}
          modes={modes}
          currentTemp={currentTemp}
          heatTemp={heatTemp}
          coolTemp={coolTemp}
          enabled={selectedRooms.size > 0}
        />
        <HeaderContainer title="Weather">
          <Weather {...weatherData} />
        </HeaderContainer>
      </HeaderContainer>
      <footer>
        <a href="https://github.com/edward3h/kumoclient/issues">
          Report a bug.
        </a>
      </footer>
    </div>
  );
}

export default App;
