import React from 'react';
import { Circle, Popup } from "react-leaflet";

import { colorConstants } from '../Constants/ColorConstants.js';

export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        return (a.cases >= b.cases ? -1 : 1);
    });

    return sortedData;
}

export const constructArray = (data) => {
    let historicDates = Array();
    let historicCases = Array();

    if ( data !== undefined ) {
        historicDates.push(Object.keys(data));
        if( Object.values(data) != null)
            historicCases.push(Object.values(data)); 
        else
            historicCases.push(0); 
    }

    return { dates: historicDates, cases: historicCases};
}

export const showDataOnMap = (data, caseType) => {
    caseType = caseType.toLowerCase();
    return (
        data.map((countryData) => (
            console.log(countryData),
            <Circle
                center={{lat: countryData.lat,lng: countryData.lng}}
                fillColor={colorConstants[caseType].fillColor}
                fillOpacity={colorConstants[caseType].alpha}
                color={colorConstants[caseType].border}
                radius={
                    Math.sqrt(countryData[caseType]) * colorConstants[caseType].multiplier
                }
            >
                <Popup>
                    {countryData.iso ?
                        <span style={{fontSize: '50px'}}>
                            {countryData.iso.replace(/./g, (char) =>
                                String.fromCodePoint(char.charCodeAt(0) + 127397)
                            )}
                        </span>
                        :
                        null
                    }

                    <div style={{fontSize: '2vh', fontWeight: 'bold'}}>
                        {countryData.name}
                        <br/>
                        {countryData[caseType]}
                    </div>
                </Popup>
            </Circle>
        ))
    );
}
