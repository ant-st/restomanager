import {createSlice} from "@reduxjs/toolkit";

const tablesSlice = createSlice({
    name: 'tables',
    initialState: {
        tables: [{id: 1, name: 'Stolik 1', order: [], isServed: true}, {id: 2, name: 'Stolik 2', order: [], isServed: false}]
    },
    reducers: {
        addTable: (state, action) => {
            state.tables.push(action.payload);
        },

    }
});

export const selectTables = (state) => {
    console.log(state.tables.tables);
    return state.tables.tables;
};

export const {
    addTable
} = tablesSlice.actions;

export default tablesSlice.reducer;


