import React from 'react';
import './Table.css';

const Table = ({ countriesCases }) => {
    return (
        <div className={'app__table'}>
            <tr className={'app__table-header'}>
                <th>Country</th>
                <th>Cases</th>
            </tr>
            
            { countriesCases.map((countryCaseObject) => (
                <tr>
                    <td>{ countryCaseObject.name }</td>
                    <td>{ countryCaseObject.cases }</td>
                </tr>
            ))}
        </div>
    );
}

export default Table;