import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }

export const dropingSurveyAction = createAsyncThunk(
    'survey-droping-by-user',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/pwa/api/survey-droping-by-user?survey_id=${data?.survey_id}`, { next_survey_id: data?.next_survey_id })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const dropingSurveySlice = createSlice({
    name: 'survey-droping-by-user',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(dropingSurveyAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(dropingSurveyAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(dropingSurveyAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const dropingSurveyReducer = dropingSurveySlice.reducer