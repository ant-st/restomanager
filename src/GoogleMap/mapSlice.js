import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiKey} from "./apiKey";
import {fetchUsers} from "../users/usersSlice";

export const setCenter = createAsyncThunk( 'map/fetchCenter', (address) => {
    address = address.replaceAll(' ','%20');
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
        .then(r => r.json())
        .then(r => {
            return r.results[0].geometry.location;
        })
    });


const mapSlice = createSlice({
    name: 'map',
    initialState: {
        center: {lat: 51.096, lng: 17.023},
        status: 'ok'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setCenter.fulfilled, (state, action) => {
                return ({
                    ...state,
                    center: action.payload,
                    status: "ok",
                });
            })
            .addCase(setCenter.rejected, (state) => {
                return ({
                    ...state,
                    status: "failed",
                });
            })
            .addCase(setCenter.pending, (state) => {
                return ({
                    ...state,
                    status: "loading",
                });
            })
    }
});


export const selectCenter = (state) => {return state.map.center}

export default mapSlice.reducer;