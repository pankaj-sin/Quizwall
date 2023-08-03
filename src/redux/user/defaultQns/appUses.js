import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const appUsesAction = createAsyncThunk(
    'default_app_uses',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/default-qns-appUses`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const appUsesDataSlice = createSlice({
    name: 'default_app_uses',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(appUsesAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(appUsesAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(appUsesAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },
})



export const appUsesDataReducer = appUsesDataSlice.reducer