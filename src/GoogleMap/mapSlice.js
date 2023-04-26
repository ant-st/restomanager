import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiKey} from "./apiKey";

export const fetchCenter = createAsyncThunk( 'map/fetchCenter', () => {
    console.log('fetching map center');
   return fetch('http://localhost:4000/api/map').then(response => response.json()).then(r => {
       return {lat: r.center[0].lat, lng: r.center[0].lng};
   })
});

export const setCenter = createAsyncThunk( 'map/setCenter', (address) => {
    address = address.replaceAll(' ','%20');
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
        .then(r => r.json())
        .then(r => {
            let newCenter = r.results[0].geometry.location;
            const fetchOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({center: newCenter})
            };
            return fetch('http://localhost:4000/api/map', fetchOptions).then(response => {
                if (!response.ok) {
                    return new Promise(resolve => resolve(null));
                }
                return newCenter;
            });
        })
    });


const mapSlice = createSlice({
    name: 'map',
    initialState: {
        center: {},
        status: 'ok'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCenter.fulfilled, (state, action) => {
                return ({
                    ...state,
                    center: action.payload,
                    status: "ok",
                });
            })
            .addCase(fetchCenter.rejected, (state) => {
                return ({
                    ...state,
                    status: "failed",
                });
            })
            .addCase(fetchCenter.pending, (state) => {
                return ({
                    ...state,
                    status: "loading",
                });
            })
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