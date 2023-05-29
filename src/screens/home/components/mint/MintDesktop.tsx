import React, { useState } from 'react';
import useMint from '../../../../hooks/useMint';
import CustomConnectButton from '../../../../services/rainbow/ConnectButton';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { decrementTxCount, dispatchCurrentTxCount, dispatchMintState, incrementTxCount } from '../../../../store/mintReducer';

import '../../styles/Canto.css'

const Mint = () => {
    const {
        maxPerTx,
        currentTxCount,
        price,
        isPublicSaleStarted,
        isWhitelistStarted,
        mintCount,
        maxPerWallet,
    } = useAppSelector(state => state.mint)
    const ethAddress = useAppSelector(state => state.user.ethAddress)
    const {
        mint,
        error,
        buttonText
    } = useMint()
    const dispatch = useAppDispatch()

    const incrementAmount = () => {
        if (currentTxCount < Number(maxPerTx)) dispatch(incrementTxCount())
    }

    const decrementAmount = () => {
        if (currentTxCount > 1) dispatch(decrementTxCount())
    }

    return (
        <>

            <div className={'mint-info'}>
                <h2 className={'mint-info_title'}>mint a Doge BullishByte [{price} ETH]</h2>
                <div className='mint-cont'>
                    <div
                        onClick={() => {
                            decrementAmount()
                        }}
                        className={
                            Number(maxPerTx) <= 1
                                ? 'block_btn'
                                : ''
                        }
                    >
                        <span>-</span>
                    </div>
                    <div>
                        <span>{currentTxCount}</span>
                    </div>
                    <div
                        onClick={() => {
                            incrementAmount()
                        }}
                        className={
                            Number(maxPerTx) <= 1
                                ? 'block_btn'
                                : ''
                        }
                    >
                        <span>+</span>
                    </div>
                </div>
                {/* <div className="mint-amount_container">
                    <div className="mint-set_amount">
                        <div
                            className='mint-set_amount-btn_long'
                            onClick={() => {
                                incrementAmount()
                            }}
                        >
                            <span>+</span>
                        </div>
                    </div>
                    <div className="mint-amount">
                        <h3 className='mint-amount_content'>{currentTxCount}</h3>
                    </div>
                    <div className='mint-set_amount'>
                        <div
                            className='mint-set_amount-btn_long'
                            onClick={() => {
                                decrementAmount()
                            }}
                        >
                            <span>-</span>
                        </div>
                    </div>
                    <div className="mint-set_amount">
                        <div className='mint-set_amount-fixed'>
                            <div
                                className='mint-set_amount-btn'
                                onClick={() => {
                                    dispatch(dispatchCurrentTxCount(1))
                                }}
                            >
                                <span>1</span>
                            </div>
                            <div
                                className='mint-set_amount-btn'
                                onClick={() => {
                                    dispatch(dispatchCurrentTxCount(Number(maxPerTx)))
                                }}
                            >
                                <span>{maxPerTx}</span>
                            </div>
                        </div>
                        <div className='mint-set_amount-increment'>
                            <div
                                className='mint-set_amount-btn_long'
                                onClick={() => {
                                    incrementAmount()
                                }}
                            >
                                <span>+</span>
                            </div>
                            <div
                                className='mint-set_amount-btn_long'
                                onClick={() => {
                                    decrementAmount()
                                }}
                            >
                                <span>-</span>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <h3 className={'mint-price_title'}>price : {Number(price) * Number(currentTxCount)} ETH</h3> */}
                {/* <h3 className={'mint-price_title'}>minted : {mintCount} / {maxPerWallet}</h3> */}
                <h5 className={'mint-price_title'}>max. {mintCount}/{maxPerWallet} doginal per wallet
                    {
                        ethAddress && isWhitelistStarted
                            ? ' DURING OG WL STAGE'
                            : ''
                    }
                </h5>
            </div>

            <CustomConnectButton
                isActive={isPublicSaleStarted || isWhitelistStarted}
                onClick={() => {
                    mint()
                }}
                text={buttonText}
            />
            <span className='error'>{error}</span>
        </>
    );
};

export default Mint;