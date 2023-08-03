import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getIncorrectAnsAction = createAsyncThunk(
    'get-incorrect-ans',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/get-incorrect-ans?survey_id=${data}`, { data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getIncorrectAnsSlice = createSlice({
    name: 'get-incorrect-ans',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getIncorrectAnsAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getIncorrectAnsAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getIncorrectAnsAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getIncorrectAnsReducer = getIncorrectAnsSlice.reducer