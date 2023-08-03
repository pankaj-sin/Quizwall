import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const startSurveyAction = createAsyncThunk(
    'start-survey',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`/pwa/api/start-survey`, data)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const startSurveySlice = createSlice({
    name: 'start-survey',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(startSurveyAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(startSurveyAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(startSurveyAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const startSurveyReducer = startSurveySlice.reducer