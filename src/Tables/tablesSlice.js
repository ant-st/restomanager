import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchTables = createAsyncThunk( 'tables/fetchTables', () => {

    return fetch('http://localhost:4000/api/tables')
        .then(response => {
            if (!response.ok) {
                return new Promise(resolve => resolve(null));
            }
            return response.json()
                .then(jsonResponse => {
                    return jsonResponse.tables.map(table => {
                        return {
                            id: table.id,
                            name: table.name,
                            order: [],
                            isServed: false,
                            isReady: false
                        }
                    });
                    });
                })
        });

export const addTable = createAsyncThunk( 'tables/addTable', (name) => {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({table: {name: name}})
    };
    return fetch('http://localhost:4000/api/tables', fetchOptions).then(response => {
        if (!response.ok) {
            return new Promise(resolve => resolve(null));
        }
        return response.json().then(jsonResponse => {
            return jsonResponse;
        });
    });
});

export const deleteTable = createAsyncThunk( 'tables/deleteTables', (id) => {
    const fetchOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({table: {id: id}})
    };
    return fetch('http://localhost:4000/api/tables', fetchOptions).then(response => {
        if (!response.ok) {
            return new Promise(resolve => resolve(null));
        }
        else return id;
    });
});

const tablesSlice = createSlice({
    name: 'tables',
    initialState: {
        tables: [],
        status: 'ok'
    },
    reducers: {
        submitOrder: (state, action) => {

            for (let i = 0; i < state.tables.length; i++) {
                if (state.tables[i].id === Number(action.payload.id)) {
                    state.tables[i].order = action.payload.order;
                    state.tables[i].orderTime = action.payload.orderTime;
                    state.tables[i].isServed = true;
                    state.tables[i].isReady = false;
                }
            }
        },
        finalizeOrder: (state, action) => {
            for (let i = 0; i < state.tables.length; i++) {
                if (state.tables[i].id === Number(action.payload.id)) {
                    let objectToSend = {
                        type: 'table',
                        name: state.tables[i].name,
                        'order_time': state.tables[i].orderTime,
                        'closing_time': new Date().toLocaleTimeString(),
                        price: action.payload.price,
                        payment: action.payload.payment
                    }
                    const fetchOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({history: objectToSend})
                    };
                    fetch('http://localhost:4000/api/history', fetchOptions).then(() => console.log('Saving to history'));

                    state.tables[i].order = [];
                    state.tables[i].isServed = false;
                    state.tables[i].isReady = false;
                }
            }
        },
        toggleIsReady: (state, action) => {
            for (let i = 0; i < state.tables.length; i++) {
                if (state.tables[i].id === Number(action.payload)) {
                    state.tables[i].isReady = true;
                    state.tables[i].order.forEach((element) => element.isReady = true);
                }
            }
        }
    },
    extraReducers:  (builder) => {
        builder
            .addCase(fetchTables.fulfilled, (state, action) => {
                return ({
                    ...state,
                    tables: action.payload,
                    status: "ok",
                });
            })
            .addCase(fetchTables.rejected, (state) => {
                return ({
                    ...state,
                    status: "failed",
                });
            })
            .addCase(fetchTables.pending, (state) => {
                return ({
                    ...state,
                    status: "loading",
                });
            })

            .addCase(addTable.pending, (state) => {
                return ({
                    ...state,
                    status: "loading",
                });
            })
            .addCase(addTable.fulfilled, (state, action) => {
                console.log(action.payload);
                let newTable = {
                    ...action.payload.table,
                    order: [],
                    isServed: false,
                    isReady: false

                }
                return ({
                    ...state,
                    tables: [...state.tables, newTable],
                    status: "ok",
                })
            })

            .addCase(deleteTable.pending, (state) => {
                return ({
                    ...state,
                    status: "loading",
                });
            })
            .addCase(deleteTable.fulfilled, (state, action) => {
                return ({
                    ...state,
                    tables: state.tables.filter(table => table.id !== action.payload),
                    status: "ok",
                })
            });
    }
});

export const selectTables = (state) => {
    return state.tables.tables;
};



export const {
    submitOrder,
    finalizeOrder,
    toggleIsReady
} = tablesSlice.actions;

export default tablesSlice.reducer;


