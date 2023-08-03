import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const userQnsAnsAction = createAsyncThunk(
    'user-qns-answer',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/user-qns-ans&limit=${data?.limit}&page=${data?.page}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const userQnsAnsSlice = createSlice({
    name: 'user-qns-answer',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userQnsAnsAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(userQnsAnsAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(userQnsAnsAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const userQnsAnsReducer = userQnsAnsSlice.reducer