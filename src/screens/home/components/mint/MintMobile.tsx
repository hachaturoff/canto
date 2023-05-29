import React, { useState } from 'react'

import SetAmountModal from './SetAmountModal';

import '../../styles/Canto.css'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import CustomConnectButton from '../../../../services/rainbow/ConnectButton';
import useMint from '../../../../hooks/useMint';
import { dispatchMintState } from '../../../../store/mintReducer';

const MintMobile = () => {
    const [isModalActive, setIsModalActive] = useState<boolean>(false)
    const [isChose, setIsChose] = useState(false)
    const {
        currentTxCount,
        price,
        isPublicSaleStarted,
        isWhitelistStarted,
        mintCount,
        maxPerWallet
    } = useAppSelector(state => state.mint)
    const ethAddress = useAppSelector(state => state.user.ethAddress)
    const {
        mint,
        error,
        buttonText,
    } = useMint()
    
    const dispatch = useAppDispatch()

    return (
        <>

            <div className='mint-info'>
                <h2 className={'mint-info_title'}>mint a BullishByte</h2>
                <div className='mint-amount-mobile'>
                    <div className='mint-amount_title-mobile'>
                        <span>number of Doge BullishBytes</span>
                    </div>
                    <div className='mint-amount_selected-mobile'>
                        <span>{currentTxCount}</span>
                    </div>
                </div>
                <div className='mint-price_container-mobile'>
                    <div className='mint-price_title-mobile'>
                        <span>price, ETH</span>
                    </div>
                    <div className='mint-price-mobile'>
                        <span>{Number(price) * Number(currentTxCount)}</span>
                    </div>
                </div>
                <div className='mint-amount-mobile'>
                    <div className='mint-amount_title-mobile'>
                        <span>minted</span>
                    </div>
                    <div className='mint-amount_selected-mobile'>
                        <span>{mintCount} / {maxPerWallet}</span>
                    </div>
                </div>
            </div>
            <div
                onClick={() => setIsModalActive(true)}
                className='mint-btn'>
                <span>Chose count of tokens</span>
            </div>
            <CustomConnectButton
                onClick={() => {
                    mint()
                }}
                isActive={isPublicSaleStarted || isWhitelistStarted}
            />
            <span className='error'>{error}</span>
            <SetAmountModal
                isActive={isModalActive}
                setIsModalActive={setIsModalActive}
                setIsChose={setIsChose}
            />
        </>
    );
};

export default MintMobile;