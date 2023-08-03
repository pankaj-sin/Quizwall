import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../src/config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getCategoryAction = createAsyncThunk(
    'get-category',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/pwa/api/categories`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getCagtegorySlice = createSlice({
    name: 'get-category',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getCategoryAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getCategoryAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getCategoryAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getCategoryReducer = getCagtegorySlice.reducer