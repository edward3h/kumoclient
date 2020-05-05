import React from "react";
import Room from "./Room";


const Table = ({
    loading, error, rooms,
    selectedRooms, onSelect,
    roomStatus, onSelectAll
}) => {

    let content;
    if (loading) {
        content = <div className="loading">Loading rooms...</div>
    } else if (error) {
        content = <div className="error">Error! {error}</div>
    } else {
        const rows = rooms.map(r =>
            <Room key={r} name={r} selected={selectedRooms.has(r)} handleClick={() => onSelect(r)} {...roomStatus[r]}/>
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
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
                <tfoot><tr onClick={onSelectAll}><th colSpan="5">Select All</th></tr></tfoot>
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