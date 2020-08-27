import React from 'react';
import { useState } from 'react';

import './InfoBox.css';

const InfoBox = ({ title, cases, total, infoBoxStyle, fontColor }) => {
   
    return (
            <div className={infoBoxStyle} style={fontColor}>
                <div className={'app__infobox-title'}>
                    { title }
                </div>
                <div className={'app__infobox-cases'}>
                    { cases }
                </div>
                <div className={'app__infobox-total'}>
                    { total }
                </div>
            </div>
    );
}

export default InfoBox;