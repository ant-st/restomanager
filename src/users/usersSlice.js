import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loggedUser: {},
        status: 'ok'
    },
    reducers: {}
});

export default usersSlice.reducer;

