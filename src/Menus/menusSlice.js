import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

/*
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('../database.sqlite');
*/

const swapElements = (array, index1, index2) => {
    array[index1] = array.splice(index2, 1, array[index1])[0];
    return array;
};

export const fetchMenus = createAsyncThunk( 'menus/fetchMenus', () => {
    return fetch('http://localhost:4000/api/menus')
        .then(response => {
            if (!response.ok) {
                return new Promise(resolve => resolve(null));
            }
            return response.json()
                .then(jsonResponse => {
                    return jsonResponse.menus.map(menu => {
                        return {
                            id: menu.id,
                            name: menu.name,
                            positions: []
                        }
                    });
                });
        });
});

export const addMenu = createAsyncThunk( 'menus/addMenu', (name) => {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({menu: {name: name}})
    };
    return fetch('http://localhost:4000/api/menus', fetchOptions).then(response => {
        if (!response.ok) {
            return new Promise(resolve => resolve(null));
        }
        return response.json().then(jsonResponse => {
            return jsonResponse;
        });
    });
});

const menusSlice = createSlice({
    name: 'menus',
    initialState:
        {
            menus: [],
            status: 'loading'
        }
        /*
        {id:0, name: 'Klasyczne', positions: [{name: 'Ziemniaki', desc: 'Ziemniaki z pyrami', price: 12}, {name: 'Kamienie', desc: 'Kamienie z pyrami', price: 13}]},
        {id:1, name: 'Sezonowe', positions: [{name: 'Pyry z gzikiem', desc: 'Ziemniaki z pyrami', price: 12}]},
        {id:2, name: 'Pizza', positions: [{name: 'Margherita', desc: 'sos, ser, bazylia', price: 15}, {name: 'Funghi', desc: 'sos, ser, pieczarki', price: 20}]}
        */
    ,

    reducers: {
        addPositionToMenu: (state, action) => {
            let newPosition = {
                name: action.payload.name,
                desc: action.payload.desc,
                price: action.payload.price,
            }
            for (let i=0;i<state.menus.length;i++) {
                if (state.menus[i].id === Number(action.payload.menuId)) {
                    state.menus[i].positions.push(newPosition);
                    return;
                }

            }
        },
        deletePositionFromMenu: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === Number(action.payload.menuId)) {
                    state[i].positions = state[i].positions.filter(element => element.name !== action.payload.name);
                    return;
                }
            }
        },
        swapPosition: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === Number(action.payload.menuId)) {
                    let index = state[i].positions.findIndex((element) => {
                        return element.name === action.payload.name;
                    });
                    if (action.payload.down) {
                        if (index < state[i].positions.length-1) state[i].positions = swapElements(state[i].positions, index, index+1);
                    }
                    else {
                        if (index !== 0) state[i].positions = swapElements(state[i].positions, index, index-1);
                    }
                    return;
                }
            }
        },
    },
    extraReducers:  (builder) => {
        builder
            .addCase(fetchMenus.fulfilled, (state, action) => {
                return (state = {
                    ...state,
                    status: "ok",
                    menus: action.payload,
                });
            })
            .addCase(fetchMenus.rejected, (state) => {
                return (state = {
                    ...state,
                    status: "failed",
                });
            })
            .addCase(fetchMenus.pending, (state) => {
                return (state = {
                    ...state,
                    status: "loading",
                });
            })

            .addCase(addMenu.pending, (state) => {
                return (state = {
                    ...state,
                    status: "loading",
                });
            })
            .addCase(addMenu.fulfilled, (state, action) => {
                let newMenu = {
                    ...action.payload.menu,
                    positions: []
                }
                return (state = {
                    ...state,
                    menus: [...state.menus, newMenu],
                    status: "ok",
                });
        });
    },
});

export const selectMenus = (state) => {
    return state.menus.menus;
};

export const selectStatus = (state) => {
    return state.menus.status;
}



export const {
    addPositionToMenu,
    deletePositionFromMenu,
    swapPosition
} = menusSlice.actions;

export default menusSlice.reducer;


