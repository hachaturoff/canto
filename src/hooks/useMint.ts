import { useEffect, useState } from 'react'
import { getIsAddressInWhiteList, getMintedCount, mintZalPublic, mintZalWhitelist } from '../services/contracts'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { dispatchMintState } from '../store/mintReducer'

const useMint = () => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState('')
    const [buttonText, setButtonText] = useState('MINT')

    const {
        isPublicSaleStarted,
        isWhitelistStarted,
        currentTxCount,
        maxPerWallet,
        maxSupply,
        totalSupply,
        price,
        maxPerTx,
        mintCount
    } = useAppSelector(state => state.mint)
    const {
        ethAddress
    } = useAppSelector(state => state.user)

    const dispatch = useAppDispatch()

    const mint = async () => {
        try {
            if (isPending) return

            setIsPending(true)
            setError('')
            setButtonText('MINTING...')
            
            if (isPublicSaleStarted) {
                if (Number(totalSupply) + currentTxCount > Number(maxSupply)) throw new Error('Max supply reached')
                if (Number(mintCount) + currentTxCount > Number(maxPerWallet)) throw new Error('Max per wallet reached')
                if (currentTxCount > Number(maxPerTx)) throw new Error('Max per tx reached')

                await mintZalPublic(currentTxCount, ethAddress, price)
            }
            if (isWhitelistStarted) {
                const isUserInWhitelist = await getIsAddressInWhiteList(ethAddress)
                if (!isUserInWhitelist) throw new Error('Your address is not whitelisted')

                if (Number(totalSupply) + currentTxCount >= Number(maxSupply)) throw new Error('Max supply reached');
                if (Number(mintCount) + currentTxCount >= 2) throw new Error('Max per wallet reached')
                if (currentTxCount >= 2) throw new Error('Max per tx reached')

                await mintZalWhitelist(currentTxCount, ethAddress, price)
            }

            setIsPending(false)
            dispatch(dispatchMintState(ethAddress))
            setButtonText('MINTED')
            await new Promise((resolve) => {
                setTimeout(() => resolve('123'), 2500)
            })
            setButtonText('MINT')
        } catch (error: any) {
            console.error(error.message)
            setError(error.message)
            setIsPending(false)
            setButtonText('MINT')
        }
    }

    useEffect(() => {
        if (error) {
            new Promise((resolve) => {
                setTimeout(() => resolve('sdf'), 4000)
            }).then(() => setError(''))
        }
    }, [error])

    return {
        mint,
        error,
        buttonText
    }
}

export default useMint