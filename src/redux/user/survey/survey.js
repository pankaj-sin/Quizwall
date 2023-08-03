import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const surveyAction = createAsyncThunk(
    'survey',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/surveys?survey_id=${data?.survey_id}&limit=${data?.limit}&page=${data?.page}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(surveyAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(surveyAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(surveyAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const surveyReducer = surveySlice.reducer