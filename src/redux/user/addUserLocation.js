import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const addUserLocationAction = createAsyncThunk(
    'add-user-location',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/add-user-location`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const addUserLocationSlice = createSlice({
    name: 'add-user-location',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(addUserLocationAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(addUserLocationAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(addUserLocationAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const addUserLocationReducer = addUserLocationSlice.reducer