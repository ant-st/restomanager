import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchMenus} from "../Menus/menusSlice";

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

const tablesSlice = createSlice({
    name: 'tables',
    initialState: {
        tables: [],
        status: 'ok'
    },
    reducers: {
        addTable: (state, action) => {
            state.tables.push(action.payload);
        },
        submitOrder: (state, action) => {
            console.log('submitting order');
            for (let i = 0; i < state.tables.length; i++) {
                if (state.tables[i].id === Number(action.payload.id)) {
                    console.log('order submitted!');
                    state.tables[i].order = action.payload.order;
                    state.tables[i].isServed = true;
                    state.tables[i].isReady = false;
                }
            }
        },
        finalizeOrder: (state, action) => {
            for (let i = 0; i < state.tables.length; i++) {
                if (state.tables[i].id === Number(action.payload)) {
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
                return (state = {
                    ...state,
                    tables: action.payload,
                    status: "ok",
                });
            })
            .addCase(fetchTables.rejected, (state) => {
                return (state = {
                    ...state,
                    status: "failed",
                });
            })
            .addCase(fetchTables.pending, (state) => {
                return (state = {
                    ...state,
                    status: "loading",
                });
            });
    }
});

export const selectTables = (state) => {
    return state.tables.tables;
};

export const selectOrders = (state) => {
    return state.tables.map(element => element.order);
}


export const {
    addTable,
    submitOrder,
    finalizeOrder,
    toggleIsReady
} = tablesSlice.actions;

export default tablesSlice.reducer;


