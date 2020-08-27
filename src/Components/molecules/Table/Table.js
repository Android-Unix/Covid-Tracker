import React from 'react';
import './Table.css';

const Table = ({ countriesData, clickedInfoBox }) => {
    const title = clickedInfoBox;
    clickedInfoBox = clickedInfoBox.toLowerCase();
    return (
        <div className={'app__table'}>
            <tr className={'app__table-header'}>
                <th>Country</th>
                <th>{title}</th>
            </tr>
            
            { countriesData.map((countryCaseObject) => (
                <tr>
                    <td>{ countryCaseObject.name }</td>
                    <td>{ countryCaseObject[clickedInfoBox] }</td>
                </tr>
            ))}
        </div>
    );
}

export default Table;