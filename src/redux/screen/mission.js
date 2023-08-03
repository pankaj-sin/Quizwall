import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../src/config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getMissionAction = createAsyncThunk(
    'get-mission',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/missions/tranding`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getCagtegorySlice = createSlice({
    name: 'get-mission',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getMissionAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getMissionAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getMissionAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getMissionReducer = getCagtegorySlice.reducer