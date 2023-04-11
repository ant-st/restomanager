import {createSlice} from "@reduxjs/toolkit";

const tablesSlice = createSlice({
    name: 'tables',
    initialState: [{id: 1, name: 'Stolik 1', order: [], isServed: false}, {id: 2, name: 'Stolik 2', order: [], isServed: false}]
    ,
    reducers: {
        addTable: (state, action) => {
            state.push(action.payload);
        },
        submitOrder: (state, action) => {
            console.log('submitting order');
            for (let i=0;i<state.length;i++) {
                if (state[i].id === Number(action.payload.id)) {
                    console.log('order submitted!');
                    state[i].order = action.payload.order;
                    state[i].isServed = true;
                }
            }
        }

    }
});

export const selectTables = (state) => {
    return state.tables;
};



export const {
    addTable,
    submitOrder
} = tablesSlice.actions;

export default tablesSlice.reducer;


