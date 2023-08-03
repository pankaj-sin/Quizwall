import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getSurveyOpningTimerAction = createAsyncThunk(
    'get-survey-active-time',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/get-survey-active-time`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getSurveyOpningTimerSlice = createSlice({
    name: 'get-survey-active-time',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getSurveyOpningTimerAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getSurveyOpningTimerAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getSurveyOpningTimerAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getSurveyOpningTimerReducer = getSurveyOpningTimerSlice.reducer