import React from 'react';
import axios from 'axios';

import { constructArray } from '../../../utils/utils.js';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import './Graph.css';

const Graph = ( { infoBoxClicked, countryName } ) => {

    const [historicData, setHistoricData] = useState();
    let graphMetrics = {};

    useEffect(() => {
        const fetchHistoricData = async () => {
            axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=7').
            then((response) => {
                setHistoricData(response.data);
            })
        }
        fetchHistoricData() 
    }, []);

    useEffect(() => {
        const fetchHistoricDataForCountry = async () => {
            const url = countryName === 'Worldwide' ? 
            'https://disease.sh/v3/covid-19/historical/all?lastdays=7' :
            `https://disease.sh/v3/covid-19/historical/${countryName}?lastdays=7`;
            
            axios.get(url).
            then((response) => {
                countryName === 'Worldwide' ?
                setHistoricData(response.data) :
                setHistoricData(response.data.timeline)
            })
        }
        fetchHistoricDataForCountry()
    }, [countryName]);
    
    
    if (historicData !== undefined) {
        graphMetrics = infoBoxClicked === 'Cases' ? 
        {
            labels: constructArray(historicData.cases).dates[0],
            datasets: [
                {
                    label: 'Cases',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(255, 192, 0, 0.4)',
                    borderColor: 'rgba(255, 170, 0, 1)',
                    data: constructArray(historicData.cases).cases[0]
                }
            ]
        } : infoBoxClicked === 'Recovered' ? {
            labels: constructArray(historicData.recovered).dates[0],
            datasets: [
                {
                    label: 'Recovered',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(82, 212, 6, 0.4)',
                    borderColor: 'rgba(60, 163, 0, 1)',
                    data: constructArray(historicData.recovered).cases[0]
                }
            ]
        } : {
            labels: constructArray(historicData.deaths).dates[0],
            datasets: [
                {
                    label: 'Deaths',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(212, 6, 6, 0.4)',
                    borderColor: 'rgba(255, 0, 0, 1)',
                    data: constructArray(historicData.deaths).cases[0]
                }
            ]
        };
    }
    
    return (
        <div>
            <div className="app__graph-head-text"> 
                {
                    countryName === 'Worldwide' ? 
                    `${infoBoxClicked} across ` :
                    `${infoBoxClicked} in `
                }
                {
                    countryName === 'Worldwide' ? 
                    "Worldwide " :
                    `${countryName} `
                } 
            </div>
            { 
                graphMetrics !== undefined ?
                <Line data={graphMetrics}/>
                :
                null
            } 
        </div>
    );
}

export default Graph;