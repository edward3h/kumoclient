import React from "react";

const Room = ({ 
    name, selected, handleClick, loading, error,
    temp, mode, heatTemp, coolTemp, updated
 }) => {


    let content;
    let rowClass = '';
    if (loading) {
        content = <td className="loading" colspan="5">Loading room...</td>
    } else if (error) {
        content = <td className="error" colspan="5">{`Error! ${error}`}</td>
    } else {
        content = (
            <>
                <td>{temp}</td>
                <td>{mode}</td>
                <td>{heatTemp}</td>
                <td>{coolTemp}</td>
            </>
        );
        if (selected) {
            rowClass = 'selected';
        }
    }
    return (
        <tr className={rowClass} onClick={handleClick}><td>{name}</td>{content}</tr>
    );
};

export default Room;