import { useEffect, useState } from "react"
import { getChainId, getMaxPerTx, getMaxSupply, getMintPrice, getTotalSupply } from "../../../services/contracts"

const useContract = (address: string) => {
    const [state, setState] = useState({
        price: '',
        maxSupply: 100,
        totalSupply: 0,
        maxPerTx: 1
    })

    const getState = async () => {
        try {
            const totalSupply = await getTotalSupply()
            const maxSupply = await getMaxSupply()
            const maxPerTx = await getMaxPerTx()
            const price = await getMintPrice()
            const chainId = await getChainId()

            setState({
                totalSupply: Number(totalSupply),
                maxSupply: Number(maxSupply),
                maxPerTx: Number(maxPerTx),
                price
            })
        } catch (error: any) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getState()
    }, [])

    return {
        state
    }
}

export default useContract