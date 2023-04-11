import {createSlice} from "@reduxjs/toolkit";

const deliSlice = createSlice({
    name: 'deli',
    initialState: []
    ,
    reducers: {
        addOrder: (state, action) => {
            state.push(action.payload);
        },
        toggleChecked: (state,action) => {
            for (let i=0;i<state.length;i++) {
                if (state[i].street === action.payload) {
                    state[i].isChecked ? state[i].isChecked=false : state[i].isChecked=true;
                }
            }
        },
        sendToKitchen: (state) => {
            for (let i=0;i<state.length;i++) {
                if (state[i].isChecked) state[i].isSent = true;
                state[i].isChecked = false;
            }
        },
        toggleReady: (state, action) => {
            for (let i=0;i<state.length;i++) {
                if (state[i].street === action.payload) {
                    state[i].isReady = true;
                    state[i].isSent = false;
                }
            }
        }
    }
});

export const selectOrders = (state) => {
    return state.deli;
}

export const selectSentOrders = (state) => {
    return state.deli.filter((element) => element.isSent);
}


export const {
    addOrder,
    toggleChecked,
    sendToKitchen,
    toggleReady
} = deliSlice.actions;

export default deliSlice.reducer;


