import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { decrementTxCount, dispatchCurrentTxCount, incrementTxCount } from '../../../../store/mintReducer';

import '../../styles/Canto.css'

interface IProp {
    isActive: boolean,
    setIsModalActive: (value: React.SetStateAction<boolean>) => void,
    setIsChose: (value: boolean) => void
}

const SetAmountModal = ({
    isActive,
    setIsModalActive,
    setIsChose
}: IProp) => {
    const {
        maxPerTx,
        currentTxCount
    } = useAppSelector(state => state.mint)
    const dispatch = useAppDispatch()

    const incrementAmount = () => {
        if (currentTxCount < Number(maxPerTx)) dispatch(incrementTxCount())
    }

    const decrementAmount = () => {
        if (currentTxCount > 1) dispatch(decrementTxCount())
    }

    return (
        <>
            {
                isActive
                && (
                    <div className='amount_modal'>
                        <h3 className='amount_modal-header'>number of Doge BullishBytes</h3>
                        <div className='amount_modal-body'>
                            <div
                                className='amount_modal-amount_button'
                                onClick={() => dispatch(dispatchCurrentTxCount(1))}
                            >
                                <span>1</span>
                            </div>
                            <div
                                className='amount_modal-amount_button'
                                onClick={() => dispatch(dispatchCurrentTxCount(Number(maxPerTx)))}
                            >
                                <span>{maxPerTx}</span>
                            </div>
                            <div
                                className='amount_modal-amount_button'
                                onClick={() => incrementAmount()}
                            >
                                <span>+</span>
                            </div>
                            <div
                                className='amount_modal-amount_button'
                                onClick={() => decrementAmount()}
                            >
                                <span>-</span>
                            </div>
                        </div>
                        <div
                            className='amount_modal-close'
                            onClick={() => {
                                setIsModalActive(false)
                                setIsChose(true)
                            }}
                        >
                            <span>OK</span>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SetAmountModal;