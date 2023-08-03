import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const userActiveSurveyStatusAction = createAsyncThunk(
    'user-active-survey-status',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/user-active-survey-status?survey_id=${data}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const userActiveSurveyStatusSlice = createSlice({
    name: 'user-active-survey-status',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userActiveSurveyStatusAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(userActiveSurveyStatusAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(userActiveSurveyStatusAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const userActiveSurveyStatusReducer = userActiveSurveyStatusSlice.reducer