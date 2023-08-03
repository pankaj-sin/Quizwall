import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const submitQnsAnsAction = createAsyncThunk(
    'submit-qns-ans',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`/pwa/api/submit-answers`, { ...data },)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const submitQnsAnsSlice = createSlice({
    name: 'submit-qns-ans',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(submitQnsAnsAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(submitQnsAnsAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(submitQnsAnsAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const submitQnsAnsReducer = submitQnsAnsSlice.reducer