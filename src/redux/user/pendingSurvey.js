import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const pendingSurveyCountAction = createAsyncThunk(
    'pending-survey-count',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/pending-survey-count`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const pendingSurveyCountSlice = createSlice({
    name: 'pending-survey-count',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(pendingSurveyCountAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(pendingSurveyCountAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(pendingSurveyCountAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const pendingSurveyCountReducer = pendingSurveyCountSlice.reducer