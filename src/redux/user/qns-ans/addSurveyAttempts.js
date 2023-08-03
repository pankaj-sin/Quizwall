import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const addSurveyAttmptsAction = createAsyncThunk(
    'add-survey-attempts',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/add-survey-attempts?survey_id=${data}&limit=${data?.limit}&page=${data?.page}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const addSurveyAttmptsSlice = createSlice({
    name: 'add-survey-attempts',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(addSurveyAttmptsAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(addSurveyAttmptsAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(addSurveyAttmptsAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const addSurveyAttmptsReducer = addSurveyAttmptsSlice.reducer