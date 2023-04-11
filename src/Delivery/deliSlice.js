import {createSlice} from "@reduxjs/toolkit";

const deliSlice = createSlice({
    name: 'deli',
    initialState: [{
        street: 'Kocia 2',
        city: 'Wroclaw',
        phone: '501362252',
        deliNote: '',
        order: [],
        total: 0,
        isSent: false,
        isReady: false,
        paymentMet: 'cash'
    }]
    ,
    reducers: {
        addOrder: (state, action) => {
            state.push(action.payload);
        },
    }
});

export const selectOrders = (state) => {
    return state.deli;
}


export const {
    addOrder
} = deliSlice.actions;

export default deliSlice.reducer;


