import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchSales = createAsyncThunk( 'sales/fetchSales', () => {
    console.log('fetching...');
    return fetch('http://localhost:4000/api/history')
        .then(response => {
            if (!response.ok) {
                return new Promise(resolve => resolve(null));
            }
            return response.json()
                .then(jsonResponse => {
                    return jsonResponse.history.map(sale => {
                        return {
                            id: sale.id,
                            name: sale.name,
                            type: sale.type,
                            date: sale.date,
                            payment: sale.payment,
                            price: sale.price,
                            orderTime: sale['order_time'],
                            closingTime: sale['closing_time'],
                        }
                    });
                });
        })
});

const salesSlice = createSlice({
    name: 'sales',
    initialState:
        {
            sales: [],
            status: 'loading'
        }
    ,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSales.fulfilled, (state, action) => {
                return ({
                    ...state,
                    sales: action.payload,
                    status: "ok",
                });
            })
            .addCase(fetchSales.rejected, (state) => {
                return ({
                    ...state,
                    status: "failed",
                });
            })
            .addCase(fetchSales.pending, (state) => {
                return ({
                    ...state,
                    status: "loading",
                });
            })
    }
});

export const selectSales = (state) => {return state.sales.sales}

export default salesSlice.reducer;