import React, { useState } from 'react';

import CountryDropdown from './Components/molecules/CountryDropdown/CountryDropdown.js';
import InfoBox from './Components/molecules/InfoBox/InfoBox.js';
import Table from './Components/molecules/Table/Table.js';
import Map from './Components/molecules/Map/Map.js';
import Graph from './Components/molecules/Graph/Graph.js';

import './App.css';
import 'leaflet/dist/leaflet.css';

import { sortData } from './utils/utils.js';
import { Card, CardContent } from '@material-ui/core';

// Using BEM naming convensions

function App() {
  const [countryInfo, setCountryInfo] = useState({});
  const [countriesCases, setCountriesCases] = useState([]);
  const [clickedInfoBox, setClickedInfoBox] = useState("Deaths");
  const [position, setPosition] = useState({lat: 29.226493,lng: 11.482882});

  let zoom = 2;

  const recievedData= async (response)=>{
   
    if(response !== null && response !== undefined){
      const countryInfo = {
        name: response.country,
        cases: response.cases,
        todayCases: response.todayCases,
        deaths: response.deaths,
        todayDeaths: response.todayDeaths,
        recovered: response.recovered,
        todayRecovered: response.todayRecovered,
      }
      const countryPosition = {
        lat: response.countryInfo !== undefined ? response.countryInfo.lat : 29.226493,
        lng: response.countryInfo !== undefined ? response.countryInfo.long : 11.482882
      }
      setCountryInfo(countryInfo);
      setPosition(countryPosition);
    }
  }

  const recievedAllCountriesData = (response) => {

    const countryCasesObject = response.map((countryData) => ({
      name: countryData.country,
      cases: countryData.cases,
      recovered: countryData.recovered,
      deaths: countryData.deaths,
      lat: countryData.countryInfo.lat,
      lng: countryData.countryInfo.long,
      iso: countryData.countryInfo.iso2
    }));
    
    setCountriesCases(countryCasesObject);
  }

  const clickHandler = (clicked) => {
    setClickedInfoBox(clicked);
  }

  let style = {
    borderColor: 'black'
  }

  return (
    <div className={'app'}>
      <div className={'app__left-container'}>
        <div className={'app__header'}>
          <h1>Covid Tracker</h1>
          <CountryDropdown requestedCountryInfoData={recievedData.bind(this)} requestedAllCountriesData={recievedAllCountriesData.bind(this)}></CountryDropdown>
        </div>
        <div className={'app__infobox-container'}>
          <div className={'app__card'} onClick={ () => clickHandler('Cases') }>
            <InfoBox 
              title={'Covid Cases'}
              cases={countryInfo.todayCases} 
              total={`${countryInfo.cases} Total`}
              fontStyle={ clickedInfoBox === 'Cases' ? {color: 'darkorange'} : {color: 'black'} }
            />
          </div>
          <div className={'app__card'} onClick={ () => clickHandler('Recovered') }>
            <InfoBox
              title={'Recovered'}
              cases={countryInfo.todayRecovered}
              total={`${countryInfo.recovered} Total`}
              fontStyle={ clickedInfoBox === 'Recovered' ? {color: 'rgb(0, 212, 0)'} : {color: 'black'} }
            />
          </div>
          <div className={'app__card'} onClick={ () => clickHandler('Deaths') }>
            <InfoBox 
              title={'Deaths'} 
              cases={countryInfo.todayDeaths} 
              total={`${countryInfo.deaths} Total`}
              fontStyle={ clickedInfoBox === 'Deaths' ? {color: 'red'} : {color: 'black'} }
            />
          </div>
        </div>
        <Map
          zoom={countryInfo.name !== undefined ? 4.8 : zoom}
          positionOfMap={position}
          allCountriesData={countriesCases}
          selectedInfoBox={clickedInfoBox}
        ></Map>
      </div>

      <Card className={'app__right-container'}>
        <CardContent>
          <Table countriesCases={ sortData(countriesCases) }></Table>
          <Graph infoBoxClicked={ clickedInfoBox } countryName={ countryInfo.name === undefined ? "Worldwide" : countryInfo.name }></Graph>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
