import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../src/config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getMissionDetailAction = createAsyncThunk(
    'get-mission-detail',
    async (data, { rejectWithValue }) => {
        console.log("data-->",data);
        try {
            const res = await axios.get(`/pwa/api/mission/detail/${data}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getMissionDetailSlice = createSlice({
    name: 'get-mission-detail',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getMissionDetailAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getMissionDetailAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getMissionDetailAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getMissionDetailReducer = getMissionDetailSlice.reducer