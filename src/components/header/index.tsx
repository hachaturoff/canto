import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useState } from "react"
import logo from '../../img/logo_BullishBytesWhite.svg'
import { useAppSelector } from "../../store/hooks"
import './styles.css'
import Button from "./WalletButton"
import { Link } from "react-router-dom"

const Header = () => {
    const {
        ethAddress
    } = useAppSelector(state => state.user)
    const [hash, setHash] = useState('')

    return (
        <header>
            <img className='logo' src={logo} alt="" />
            <div>
                <nav>
                    <Link to='/'>Sale</Link>
                    <Link to='/nft'>Check BullishByte</Link>
                </nav>
                {
                    ethAddress
                        ? (<Button />)
                        : ''
                }
                {/* <div className="show-hash">
                    <input
                        type="text"
                        value={hash}
                        onChange={e => setHash(e.target.value)}
                        placeholder='91hsg177fka01li8gha88h...'
                    />
                    <button>Show inscription</button>
                </div> */}
            </div>
        </header>
    )
}

export default Header