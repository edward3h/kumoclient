import React, { useState, useEffect } from "react";
import Room from "./Room";


const Table = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setErrors] = useState(false);

    async function fetchData() {
        setLoading(true);
        const res = await fetch("/v0/rooms");
        res
            .json()
            .then(res => setRooms(res))
            .catch(err => setErrors(err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchData();
    }, []);

    let content;
    if (loading) {
        content = <div className="loading">Loading rooms...</div>
    } else if (error) {
        content = <div className="error">Error! {error}</div>
    } else {
        const rows = rooms.map(r =>
            <Room key={r} name={r} />
        );
        content = (
            <table>
                <thead>
                    <tr>
                        <th>Room</th>
                        <th>Current</th>
                        <th>Mode</th>
                        <th>Heat</th>
                        <th>Cool</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    return (
        <>
            {content}
        </>
    );
};

export default Table;