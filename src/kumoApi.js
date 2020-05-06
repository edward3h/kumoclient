// not a React component :-P
// depends on the API server from https://github.com/sushilks/kumojs (technically it depends on my fork right now because of a minor bugfix)

const request = async (url, method = 'GET') => {
    const res = await fetch(url, {method});
    if (res.ok) {
        return await res.json();
    }
    throw new Error(res.status);
};

const c2f = (tempC) => Math.round(tempC * 9 / 5 + 32);

const convertStatus = (resStatus) => {
    const s = resStatus?.r?.indoorUnit?.status;
    if (s) {
        return {
            temp: c2f(s.roomTemp),
            mode: s.mode,
            heatTemp: c2f(s.spHeat),
            coolTemp: c2f(s.spCool),
            updated: Date.now()
        };
    }
    throw new Error('No status found in response');
};

const getRooms = () => request('v0/rooms');

const getRoomStatus = (name) => request(`v0/room/${name}/status`).then(convertStatus);

const setRoomMode = (name, mode) => request(`v0/room/${name}/mode/${mode}`, 'PUT');

const setRoomHeat = (name, temp) => request(`v0/room/${name}/heat/temp/${temp}`, 'PUT');

const setRoomCool = (name, temp) => request(`v0/room/${name}/cool/temp/${temp}`, 'PUT');

export default {
    getRooms,
    getRoomStatus,
    setRoomMode,
    setRoomHeat,
    setRoomCool
};