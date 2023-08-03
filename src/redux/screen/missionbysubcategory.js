import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getMissionActionBySubCat = createAsyncThunk(
    'get-mission-by-sub-cat',
    async (data, { rejectWithValue }) => {
        console.log("data-->",data)
        try {
            const res = await axios.get(`/pwa/api/missions/by/sub-category/${data}`,)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getMissionSliceBySubCat = createSlice({
    name: 'get-mission-by-sub-cat',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getMissionActionBySubCat.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getMissionActionBySubCat.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getMissionActionBySubCat.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getMissionBySubCatReducer = getMissionSliceBySubCat.reducer