// not a React component :-P
// depends on the API server from https://github.com/sushilks/kumojs (technically it depends on my fork right now because of a minor bugfix)

const get = async (url) => {
    const res = await fetch(url);
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

const getRooms = () => get('/v0/rooms');

const getRoomStatus = (name) => get(`/v0/room/${name}/status`).then(convertStatus);

export default {
    getRooms,
    getRoomStatus
};