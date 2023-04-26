import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const mapSlice = createSlice({
    name: 'map',
    initialState: {
        center: { lat: 51.096, lng: 17.023 }
    },
    reducers: {}
});

export const selectCenter = (state) => {return state.map.center}

export default mapSlice.reducer;