import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../../../store/hooks';

const progressBarWidth = 245

const Progressbar = () => {
    const {
        maxSupply,
        totalSupply
    } = useAppSelector(state => state.mint)

    const getProgress = () => {
        const diff = (100 * Number(totalSupply)) / Number(maxSupply)
        return ( progressBarWidth * diff) / 100
    }

    return (
        <div className='progressbar-container'>
            <div className='progressbar-left_amount'>
                <span>{totalSupply}/{maxSupply} minted</span>
            </div>

            <div className='progressbar' style={{width: progressBarWidth + 'px'}}>
                <div className='progressbar-fill' style={{width: getProgress() + 'px'}}></div>
            </div>
        </div>
    );
};

export default Progressbar;