import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getUserDetailsAction = createAsyncThunk(
    'get-user',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/get-user`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getUserDetailsSlice = createSlice({
    name: 'get-user',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getUserDetailsAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getUserDetailsAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getUserDetailsAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getUserDetailsReducer = getUserDetailsSlice.reducer