import Progressbar from './components/mint/Progressbar'
import Mint from './components/mint'
import Footer from "../../components/footer/Footer";

import bear from '../../img/bear.png'

import './styles/Canto.css'
import CustomConnectButton from '../../services/rainbow/ConnectButton'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Header from '../../components/header';

const Canto = () => {
    const {
        ethAddress,
    } = useAppSelector(state => state.user)
    const {
        maxSupply,
        isUserInWhitelist,
        isWhitelistStarted
    } = useAppSelector(state => state.mint)
    const dispatch = useAppDispatch()

    return (
        <div className='page-container'>
            <Header />
            <div className="main-wrapper">
                <img className='bear' src={bear} alt="" />
                {/* <Progressbar /> */}
                <p className="text">{maxSupply} BULLISH BYTES ON DOGECOIN.</p>
                &nbsp;&nbsp;
                <p className="text" style={{marginTop: 0}}>BullishBytes is an original pixel art NFT-collection on Dogecoin.
                    <br></br>
                    {maxSupply} Genesis BullishBytes inscribed in Dogecoin on February, 26.
                </p>
                {/* {
                    isWhitelistStarted && ethAddress
                        ? isUserInWhitelist
                            ? (<p className="text whitelisted">Your address is OG whitelisted.</p>)
                            : (<p className="text notwhitelisted">Your address is not OG whitelisted.</p>)
                        : ''
                } */}
                {/* {
                    ethAddress
                        ? <Mint />
                        : <CustomConnectButton
                            isActive={true}
                        />
                } */}
                <p style={{ fontSize: '16px', marginTop: '50px' }} className="text">SALE HAS ENDED</p>
            </div>
            <Footer />
        </div>
    )
}

export default Canto
