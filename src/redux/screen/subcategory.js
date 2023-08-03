import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../src/config/authAxios"


const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getSubCategoryAction = createAsyncThunk(
    'get-subcategory',
    async (data, { rejectWithValue }) => {
        console.log("data-->",data);
        try {
            const res = await axios.get(`/pwa/api/sub-categories/${data}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getCagtegorySlice = createSlice({
    name: 'get-subcategory',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getSubCategoryAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getSubCategoryAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getSubCategoryAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getSubCategoryReducer = getCagtegorySlice.reducer