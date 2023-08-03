import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, loading: false, data: [], error: "", message: '' }

export const qnsCountAction = createAsyncThunk(
    'qns-count',
    async (data = null, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/survey-qns-count?survey_id=${data}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const qnsCountSlice = createSlice({
    name: 'qns-count',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(qnsCountAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(qnsCountAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
                state.message = action.payload.message
                state.status = action.payload.status

            })
            builder.addCase(qnsCountAction.rejected, (state, action) => {
                state.loading = false
                state.data = action.payload.data
                state.error = action.payload.error
                state.status = action.payload.status
            })
        },

})



export const qnsCountReducer = qnsCountSlice.reducer