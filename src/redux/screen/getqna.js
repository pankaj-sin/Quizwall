import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../src/config/authAxios"



const initialState = { status: null, message: "", loading: false, data: [], error: "" }


export const getQnaAction = createAsyncThunk(
    'get-qna',
    async (data, { rejectWithValue }) => {
        console.log("data action-->",data)
        try {
            const res = await axios.post(`/pwa/api/mission/start`,data)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getQnaSlice = createSlice({
    name: 'get-qna',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getQnaAction.pending, (state) => {
                state.data = []
                state.loading = true
            })
            builder.addCase(getQnaAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.message = action.payload.message
                state.status = action.payload.status
            })
            builder.addCase(getQnaAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
                state.message = action.payload.message
                state.status = action.payload.status
            })
        },

})



export const getQnaReducer = getQnaSlice.reducer