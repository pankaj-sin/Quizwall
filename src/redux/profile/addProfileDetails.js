import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const addProfileDetailsAction = createAsyncThunk(
    'add-profile-details',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/pwa/api/add-profile-details`, { ...data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const addProfileDetailsSlice = createSlice({
    name: 'add-profile-details',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(addProfileDetailsAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(addProfileDetailsAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(addProfileDetailsAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const addProfileDetailsReducer = addProfileDetailsSlice.reducer