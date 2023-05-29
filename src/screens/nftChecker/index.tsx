import { useState } from "react"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header"
import { explorerUrl } from "./config"
import './styles.css'
import useChecker from "./useChecker"

const NftChecker = () => {
    const {
        status,
        hash,
        setHash,
        check,
    } = useChecker()

    return (
        <div className="page-container">
            <Header />
            <div className="main-wrapper nft-checker">
                <h5>Check legitimacy of BullishByte by comparing your hash to our manifest</h5>
                <input
                    className={status.status}
                    type="text"
                    placeholder="d711a99a4a1a97b68e713bb507f28f4acdc13c07ea62d34b18224d3f05b8344b"
                    value={hash}
                    onChange={e => setHash(e.target.value)}
                    maxLength={75}
                />
                <span className={status.status}>{status.text}</span>
                <button onClick={() => check()}>Check</button>
                <button>
                    {
                        hash
                            ? <a href={`${explorerUrl}/tx/${hash.slice(-2) === 'i0' ? hash.slice(0, -2) : hash}`} target="_blank" rel="noreferrer">Show in explorer</a>
                            : 'Show in explorer'
                    }
                </button>
            </div>
            <Footer />
        </div>
    )
}

export default NftChecker