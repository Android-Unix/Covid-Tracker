import React from 'react';
import { Map as LeafLetMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../../../utils/utils.js';

import './Map.css';

const Map = ({ allCountriesData, positionOfMap, zoom, selectedInfoBox }) => {
    return (
        <div className="app__map">
            <LeafLetMap center={positionOfMap} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showDataOnMap(allCountriesData, selectedInfoBox)}
            </LeafLetMap>
        </div>
    );
}

export default Map;