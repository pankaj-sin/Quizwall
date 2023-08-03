import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"

const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const registerAction = createAsyncThunk(
    'register',
    async (data, { rejectWithValue }) => {
        try {

            const res = await axios.post(`/pwa/auth/register`, { ...data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(registerAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(registerAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(registerAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const registerReducer = registerSlice.reducer