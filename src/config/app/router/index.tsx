import { getEnv } from "../../../utils"
import {
    Route, BrowserRouter, Routes, Navigate,
} from "react-router-dom";
import Home from "../../../screens/home/Home";
import Soon from "../../../screens/soon/Soon";
import NftChecker from "../../../screens/nftChecker";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";
import { getEthAddress } from "../../../services/contracts";
import { dispatchEthAddress } from "../../../store/userReducer";
import { dispatchMintState } from "../../../store/mintReducer";

const Router = () => {
    const isCommingSoon = getEnv(process.env.REACT_APP_IS_COMMING_SOON, 'REACT_APP_IS_COMMING_SOON')
    const {
        ethAddress,
    } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        getEthAddress().then(res => dispatch(dispatchEthAddress(res)))

        window.ethereum?.on('accountsChanged', (address: string[]) => {
            dispatch(dispatchEthAddress(address[0] ?? ''))
        })

        return () => {
            window.ethereum?.removeListener('accountsChanged', (address: string[]) => {
                dispatch(dispatchEthAddress(address[0] ?? ''))
            })
        }
    }, [])

    useEffect(() => {
        dispatch(dispatchMintState(ethAddress))
    }, [ethAddress])

    return (
        <BrowserRouter>
            <div className="Main">
                <Routes>
                    <Route
                        path="/"
                        element={
                            isCommingSoon === 'true'
                                ? <Soon />
                                : <Home />
                        }
                    />
                    <Route
                        path="/nft"
                        element={<NftChecker />}
                    />
                    <Route
                        path='*'
                        element={(
                            <Navigate
                                to='/'
                                replace
                            />
                        )}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Router