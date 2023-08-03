import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const userVisibleTaskCountAction = createAsyncThunk(
    'user-visible-task-count',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/user-visible-task-count`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const userVisibleTaskCountSlice = createSlice({
    name: 'user-visible-task-count',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userVisibleTaskCountAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(userVisibleTaskCountAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(userVisibleTaskCountAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const userVisibleTaskCountReducer = userVisibleTaskCountSlice.reducer