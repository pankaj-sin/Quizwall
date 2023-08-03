import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getSurveyAction = createAsyncThunk(
    'get-survey',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/get-survey`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getSurveySlice = createSlice({
    name: 'get-survey',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getSurveyAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getSurveyAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getSurveyAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getSurveyReducer = getSurveySlice.reducer