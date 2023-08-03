import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../src/config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getBannerAction = createAsyncThunk(
    'get-banner',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/banners`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getBannerSlice = createSlice({
    name: 'get-banner',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getBannerAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getBannerAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getBannerAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getBannerReducer = getBannerSlice.reducer