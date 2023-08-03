import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getUserCompletedSurveyAction = createAsyncThunk(
    'get-user-complete-survey',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/get-user-complete-survey`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getUserCompletedSurveySlice = createSlice({
    name: 'get-user-complete-survey',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getUserCompletedSurveyAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getUserCompletedSurveyAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getUserCompletedSurveyAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getUserCompletedSurveyReducer = getUserCompletedSurveySlice.reducer