import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }

export const loginAction = createAsyncThunk(
    'login',
    async (data, { rejectWithValue }) => {
        try {

            const res = await axios.post(`/pwa/auth/login`, { ...data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(loginAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(loginAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(loginAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const loginReducer = loginSlice.reducer