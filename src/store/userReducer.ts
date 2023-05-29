import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    ethAddress: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        dispatchEthAddress: (state, action: PayloadAction<string>) => {
            state.ethAddress = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { dispatchEthAddress } = userSlice.actions

export default userSlice.reducer