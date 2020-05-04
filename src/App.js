import React, { useState, useEffect } from "react";
import './App.css';
import Table from './Table';
import kumoApi from './kumoApi';
import useInterval from './useInterval';
import isEqual from 'lodash/isEqual';

function App() {
  const [roomNames, setRoomNames] = useState([]);
  const [roomData, setRoomData] = useState({});
  const [selectedRooms, setSelected] = useState(new Set());
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0); // counter used to force updates in some cases

  // trigger a status update every so often
  useInterval(() => setTrigger((x) => x + 1), 60 * 1000);

  // get room names
  useEffect(() => {
    setRoomsLoading(true);

    kumoApi.getRooms()
    .then(setRoomNames)
    .catch(setError)
    .finally(() => setRoomsLoading(false));
  }, []); // should never change after load

  // get room statuses
  useEffect(() => {  
    
    const updateRoomData = (name, data) => {
    setRoomData((oldObj) => {
      const newObj = {...oldObj};
      newObj[name] = data;
      return newObj;
    });
  };
    const getRoomStatus = (name) => {
      updateRoomData(name, {loading: true});

      kumoApi.getRoomStatus(name)
      .then((data) => updateRoomData(name, data))
      .catch((error) => updateRoomData(name, {error}));
      // don't need to unset loading, it is effectively removed by the result or error cases above
    };
    roomNames.forEach(getRoomStatus);
  }, [roomNames, trigger]); // update based on roomNames or when triggered

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Heat Controls</h1>
      </header>
      <div className="content">
        <Table loading={roomsLoading} error={error} rooms={roomNames}
        selectedRooms={selectedRooms} onSelect={toggleSelectedRoom}
        roomStatus={roomData} onSelectAll={toggleSelectAll}/>
      </div>
    </div>
  );
}

export default App;
