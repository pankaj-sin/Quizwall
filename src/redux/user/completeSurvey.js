import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const completeSurveyAction = createAsyncThunk(
    'complete-survey',
    async (data, { rejectWithValue }) => {
        try {

            console.log("data-------->", data)

            const res = await axios.patch(`/pwa/api/complete-survey`, { ...data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const completeSurveySlice = createSlice({
    name: 'complete-survey',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(completeSurveyAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(completeSurveyAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(completeSurveyAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const completeSurveyReducer = completeSurveySlice.reducer