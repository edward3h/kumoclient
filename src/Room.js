import React, { useState, useEffect } from "react";
import useInterval from './useInterval';
import Moment from 'react-moment';

const c2f = (tempC) => Math.round(tempC * 9 / 5 + 32);

const convertStatus = (resStatus) => {
    console.log(resStatus);
    const s = resStatus.r.indoorUnit.status;
    return {
        temp: c2f(s.roomTemp),
        mode: s.mode,
        heatTemp: c2f(s.spHeat),
        coolTemp: c2f(s.spCool),
        updated: Date.now()
    };
};

const Room = ({ name }) => {
    const [status, setStatus] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setErrors] = useState(false);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        async function fetchStatus() {
            setLoading(true);
            const res = await fetch(`/v0/room/${name}/status`);
            res
                .json()
                .then(res => setStatus(convertStatus(res)))
                .catch(err => setErrors(err))
                .finally(() => setLoading(false));
        }
        fetchStatus();
    }, [name, trigger]);

    useInterval(() => {
        setTrigger(trigger + 1);
    }, 5 * 60 * 1000);

    let content;
    if (loading) {
        content = <td className="loading">Loading room...</td>
    } else if (error) {
        content = <td className="error">Error! {error}</td>
    } else {
        content = (
            <>
                <td>{status.temp}</td>
                <td>{status.mode}</td>
                <td>{status.heatTemp}</td>
                <td>{status.coolTemp}</td>
                <td><Moment format="HH:mm">{status.updated}</Moment></td>
            </>
        );
    }
    return (
        <tr><td>{name}</td>{content}</tr>
    );
};

export default Room;