import {createSlice} from "@reduxjs/toolkit";

const menusSlice = createSlice({
    name: 'menus',
    initialState: [{id:1, name: 'Klasyczne', positions: [{name: 'Ziemniaki', desc: 'Ziemniaki z pyrami', price: 12}, {name: 'Kamienie', desc: 'Kamienie z pyrami', price: 13}]}, {id:2, name: 'Sezonowe', positions: [{name: 'Ziemniaki', desc: 'Ziemniaki z pyrami', price: 12}]}],
    reducers: {
        addMenu: (state, action) => {
            state.push(action.payload);
        },
        addPositionToMenu: (state, action) => {
            let newPosition = {
                name: action.payload.name,
                desc: action.payload.desc,
                price: action.payload.price,
            }
            for (let i=0;i<state.length;i++) {
                if (state[i].id === Number(action.payload.menuId)) {
                    console.log('inside');
                    state[i].positions.push(newPosition);
                    return;
                }

            }
        },


    }
});

export const selectMenus = (state) => {
    return state.menus;
};



export const {
    addTable,
    addPositionToMenu
} = menusSlice.actions;

export default menusSlice.reducer;


