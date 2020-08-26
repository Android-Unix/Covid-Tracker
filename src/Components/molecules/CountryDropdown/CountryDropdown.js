import React from 'react';
import axios from 'axios';

import { useState, useEffect } from 'react';
import { Select, FormControl, MenuItem } from '@material-ui/core';

import './CountryDropdown.css';

// Using BEM naming convensions

const CountryDropDown = ({ requestedCountryInfoData, requestedAllCountriesData }) => {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

  useEffect(() => {
    const fetchAllCountriesData = async () => {
      await axios.get("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        const country = response.data.map((countryData) => ({
              name: countryData.country,
              lat: countryData.countryInfo.lat
          }));
        sendAllCountriesData(response.data);
        setCountries(country);
      }) 
    }
    fetchAllCountriesData();
  }, []);


  useEffect(() => {
    const getCountryDetails = async () => {
      const url = 'https://disease.sh/v3/covid-19/all'

      await axios.get(url)
      .then((response) => {
        sendCountryInfoData(response.data);
      });
    }
    getCountryDetails();
  }, []);


  useEffect(() => {
    const getCountryDetails = async (selectedCountry) => {
      const url = selectedCountry === 'Worldwide' ? 
      'https://disease.sh/v3/covid-19/all': 
      `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

      await axios.get(url)
      .then((response) => {
        sendCountryInfoData(response.data);
      });
    }
    getCountryDetails(country);
  }, [country]);

  const sendAllCountriesData = (data) => {
    requestedAllCountriesData(data);
  }

  const sendCountryInfoData = (data) => {
    requestedCountryInfoData(data);
  }

  const onCountryChange = (event) => {
    event.preventDefault();
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
  }

  return (
    <FormControl className={'app__dropdown'}>
      <Select variant={'outlined'} value={country} onChange={onCountryChange} style={{fontSize: '3vh'}}>
        <MenuItem value={ 'Worldwide' } style={{fontSize: '2.5vh'}}> 
            { 'Worldwide' } 
        </MenuItem>
        { countries.map((country) => (
          <MenuItem value={ country.name } style={{fontSize: '2.5vh'}}> 
            { country.name } 
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CountryDropDown;
