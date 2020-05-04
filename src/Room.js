import React from "react";
import Moment from 'react-moment';
import './Room.css';


const Room = ({ 
    name, selected, handleClick, loading, error,
    temp, mode, heatTemp, coolTemp, updated
 }) => {


    let content;
    let rowClass = '';
    if (loading) {
        content = <td className="loading">Loading room...</td>
    } else if (error) {
        content = <td className="error">Error! {error}</td>
    } else {
        content = (
            <>
                <td>{temp}</td>
                <td>{mode}</td>
                <td>{heatTemp}</td>
                <td>{coolTemp}</td>
                <td><Moment format="HH:mm">{updated}</Moment></td>
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