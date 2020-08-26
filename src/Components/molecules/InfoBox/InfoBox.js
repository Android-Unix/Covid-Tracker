import React from 'react';
import { useState } from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

const InfoBox = ({ title, cases, total, fontStyle }) => {
   
    return (
            <Card className={title === 'Recovered' ?
                ['app__infobox', 'app__recovered', 'app__infobox-recovered'] :
                title === 'Deaths' ? 
                ['app__infobox', 'app__deaths', 'app__infobox-deaths'] :
                ['app__infobox', 'app__cases', 'app__infobox-cases']
            } style={fontStyle}>
                <CardContent>
                    <Typography className={'app__infobox-title'}>
                        { title }
                    </Typography>
                    <Typography className={'app__infobox-cases'}>
                        { cases }
                    </Typography>
                    <Typography className={'app__infobox-total'}>
                        { total }
                    </Typography>
                </CardContent>
            </Card>
    );
}

export default InfoBox;