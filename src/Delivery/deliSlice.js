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
        },
        deleteOrder: (state) => {
            return state.filter((element) => !element.isChecked);
        },
        sendDriver: (state) => {
            //tbc
            state.forEach(element => {
                if (element.isChecked && element.isReady) {
                    let objectToSend = {
                        type: 'deli',
                        name: element.phone,
                        'order_time': element.orderTime,
                        'closing_time': new Date().toLocaleTimeString(),
                        price: element.total,
                        payment: element.paymentMet,
                        user: element.waiter.id
                    }
                    console.log(objectToSend);
                    const fetchOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({history: objectToSend})
                    };
                    fetch('http://localhost:4000/api/history', fetchOptions).then(() => console.log('Saving to history'));
                }
            });
            return state.filter((element) => {
                return !(element.isChecked && element.isReady);
            });
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
    toggleReady,
    deleteOrder,
    sendDriver
} = deliSlice.actions;

export default deliSlice.reducer;


