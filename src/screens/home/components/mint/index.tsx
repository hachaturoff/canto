import React, { Fragment } from 'react'
import Media from 'react-media'

import MintDesktop from './MintDesktop'
import MintMobil from './MintMobile'

import '../../styles/Canto.css'

const Mint = () => {
    return (
        <div className='mint-container'>
            <MintDesktop />
        </div>
    );
};

export default Mint;