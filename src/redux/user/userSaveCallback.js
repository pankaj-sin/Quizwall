import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const userSaveCallbackAction = createAsyncThunk(
    'save-user-callback',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`/pwa/api/save-user-callback`, { ...data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const userSaveCallbackSlice = createSlice({
    name: 'save-user-callback',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userSaveCallbackAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(userSaveCallbackAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(userSaveCallbackAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const userSaveCallbackReducer = userSaveCallbackSlice.reducer