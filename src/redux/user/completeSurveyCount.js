import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const completeSurveyCountAction = createAsyncThunk(
    'complete-survey-count',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/complete-survey-count`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const completeSurveyCountSlice = createSlice({
    name: 'complete-survey-count',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(completeSurveyCountAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(completeSurveyCountAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(completeSurveyCountAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const completeSurveyCountReducer = completeSurveyCountSlice.reducer