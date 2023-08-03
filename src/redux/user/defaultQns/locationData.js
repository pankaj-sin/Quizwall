import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const userLocationQnsDataAction = createAsyncThunk(
    'user-location-qns',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/default-qns-location`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const userLocationDataSlice = createSlice({
    name: 'user-location-qns',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userLocationQnsDataAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(userLocationQnsDataAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(userLocationQnsDataAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },
})



export const userLocationDataReducer = userLocationDataSlice.reducer