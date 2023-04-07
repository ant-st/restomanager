import {createSlice} from "@reduxjs/toolkit";

const menusSlice = createSlice({
    name: 'menus',
    initialState: [{id:1, name: 'Klasyczne', positions: [{name: 'Ziemniaki', desc: 'Ziemniaki z pyrami', price: 12}]}],
    reducers: {
        addMenu: (state, action) => {
            state.push(action.payload);
        },

    }
});

export const selectMenus = (state) => {
    return state.menus;
};

export const {
    addTable
} = menusSlice.actions;

export default menusSlice.reducer;


