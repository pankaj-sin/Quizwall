import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getQnsAnsAction = createAsyncThunk(
    'get-qns-ans',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/get-survey-qns-ans?survey_id=${data?.survey_id}&limit=${data?.limit}&page=${data?.page}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getQnsAnsSlice = createSlice({
    name: 'get-qns-ans',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getQnsAnsAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getQnsAnsAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getQnsAnsAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getQnsAnsReducer = getQnsAnsSlice.reducer