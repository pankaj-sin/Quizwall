import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const userRewardToGpAction = createAsyncThunk(
    'user-send-reward-gp',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/pwa/api/user-reward-to-gp`, { ...data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const userRewardToGpSlice = createSlice({
    name: 'user-send-reward-gp',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userRewardToGpAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(userRewardToGpAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(userRewardToGpAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const userRewardToGpReducer = userRewardToGpSlice.reducer