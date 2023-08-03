import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const userCompleteSurveyArrayAction = createAsyncThunk(
    'user-complete-surveys-array',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/user-complete-surveys-array?survey_id=${data}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const userCompleteSurveyArraySlice = createSlice({
    name: 'user-complete-surveys-array',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userCompleteSurveyArrayAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(userCompleteSurveyArrayAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(userCompleteSurveyArrayAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const userCompleteSurveyArrayReducer = userCompleteSurveyArraySlice.reducer