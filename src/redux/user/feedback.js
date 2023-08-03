import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const feedbackAction = createAsyncThunk(
    'feedback',
    async (data = null, { rejectWithValue }) => {
        try {
            const res = await axios.post(`/pwa/api/user-feedback`, { ...data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(feedbackAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(feedbackAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(feedbackAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const feedbackReducer = feedbackSlice.reducer