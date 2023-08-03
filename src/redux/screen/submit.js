import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../src/config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const submitAction = createAsyncThunk(
    'submit',
    async (data, { rejectWithValue }) => {
        console.log("data-->",data);
        try {
            const res = await axios.post(`/pwa/api/mission/end/`,data)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const submitSlice = createSlice({
    name: 'submit',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(submitAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(submitAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(submitAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const submitReducer = submitSlice.reducer