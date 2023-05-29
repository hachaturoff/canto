import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getIsAddressInWhiteList, getIsSaleStarted, getIsWhitelist, getMaxPerTx, getMaxPerWallet, getMaxPerWhitelistWallet, getMaxSupply, getMintedCount, getMintPrice, getTotalSupply, getWhitelistMinted } from '../services/contracts'

const initialState = {
    price: '0.01',
    maxSupply: '100',
    totalSupply: '0',
    maxPerTx: '1',
    currentTxCount: 1,
    isWhitelistStarted: false,
    isPublicSaleStarted: false,
    isUserInWhitelist: false,
    maxPerWallet: '1',
    mintCount: '0',
    isLoaded: false,
}

export const dispatchMintState = createAsyncThunk(
    'mint/dispatchMintState',
    async (address: string) => {
        try {
            const totalSupply = await getTotalSupply()
            const maxSupply = await getMaxSupply()
            let maxPerTx = await getMaxPerTx()
            const price = await getMintPrice()

            const isPublicSaleStarted = await getIsSaleStarted()
            const isWhitelistStarted = await getIsWhitelist()

            const maxPerWhitelistWallet = await getMaxPerWhitelistWallet()
            const maxPerPublicWallet = await getMaxPerWallet()

            let totalMinted = '0'
            let whitelistMinted = '0'
            let isUserInWhitelist = false

            if (address) {
                totalMinted = await getMintedCount(address)
                whitelistMinted = await getWhitelistMinted(address)
                isUserInWhitelist = await getIsAddressInWhiteList(address)
            }

            let maxPerWallet
            let mintCount

            console.log(whitelistMinted, totalMinted)

            if (isPublicSaleStarted) {
                maxPerWallet = maxPerPublicWallet
                mintCount = `${Number(totalMinted) - Number(whitelistMinted)}`
                if (Number(maxPerWallet) - Number(mintCount) < maxPerTx) {
                    maxPerTx = Number(maxPerWallet) - Number(mintCount)
                }
            }
            if (isWhitelistStarted) {
                maxPerWallet = maxPerWhitelistWallet
                mintCount = `${Number(whitelistMinted)}`
                if (Number(maxPerWallet) - Number(mintCount) < maxPerTx) {
                    maxPerTx = Number(maxPerWallet) - Number(mintCount)
                }
            }

            return {
                totalSupply,
                maxSupply: `${Number(maxSupply) - 1}`,
                maxPerTx: `${Number(maxPerTx) - 1}`,
                price,
                isPublicSaleStarted,
                isWhitelistStarted,
                isUserInWhitelist,
                maxPerWallet: `${Number(maxPerWallet) - 1}`,
                mintCount,
                isLoaded: Boolean(address),
            }
        } catch (error: any) {
            console.error(error.message)
        }
    }
)

export const mintSlice = createSlice({
    name: 'mint',
    initialState,
    reducers: {
        dispatchCurrentTxCount: (state, action: PayloadAction<number>) => {
            state.currentTxCount = action.payload
        },
        incrementTxCount: (state) => {
            state.currentTxCount++
        },
        decrementTxCount: (state) => {
            state.currentTxCount--
        }
    },
    extraReducers(builder) {
        builder.addCase(dispatchMintState.fulfilled, (state, action) => {
            state.totalSupply = action.payload?.totalSupply || state.totalSupply
            state.maxSupply = action.payload?.maxSupply || state.maxSupply
            state.maxPerTx = action.payload?.maxPerTx || state.maxPerTx
            state.price = action.payload?.price || state.price
            state.isPublicSaleStarted = action.payload?.isPublicSaleStarted || state.isPublicSaleStarted
            state.isWhitelistStarted = action.payload?.isWhitelistStarted || state.isWhitelistStarted
            state.isUserInWhitelist = action.payload?.isUserInWhitelist || state.isUserInWhitelist
            state.maxPerWallet = action.payload?.maxPerWallet || state.maxPerWallet
            state.mintCount = action.payload?.mintCount || state.mintCount
            if (!state.isLoaded) {
                state.currentTxCount = Math.ceil(Number(action.payload?.maxPerTx) / 2) || 1
            }
            state.isLoaded = action.payload?.isLoaded ?? state.isLoaded
        })
    },
})

// Action creators are generated for each case reducer function
export const { dispatchCurrentTxCount, incrementTxCount, decrementTxCount } = mintSlice.actions

export default mintSlice.reducer