import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addMenu} from "../Menus/menusSlice";

export const fetchUsers = createAsyncThunk( 'users/fetchUsers', () => {
    console.log('fetching users...');
    return fetch('http://localhost:4000/api/users')
        .then(response => {
            if (!response.ok) {
                return new Promise(resolve => resolve(null));
            }
            return response.json()
                .then(jsonResponse => {
                    return jsonResponse.users
                    });
                });
        });

export const addUser = createAsyncThunk( 'users/addUser', (newUser) => {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: newUser})
    };
    return fetch('http://localhost:4000/api/users', fetchOptions).then(response => {
        if (!response.ok) {
            return new Promise(resolve => resolve(null));
        }
        return response.json().then(jsonResponse => {
            return jsonResponse.user;
        });
    });
});

export const toggleActiveUser = createAsyncThunk('users/toggleActiveUser', (userID) => {
    const fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: userID})
    };
    return fetch('http://localhost:4000/api/users', fetchOptions).then(response => {
        if (!response.ok) {
            return new Promise(resolve => resolve(null));
        }
        return userID;
        });
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loggedUser: {},
        status: 'ok'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return ({
                    ...state,
                    users: action.payload,
                    status: "ok",
                });
            })
            .addCase(fetchUsers.rejected, (state) => {
                return ({
                    ...state,
                    status: "failed",
                });
            })
            .addCase(fetchUsers.pending, (state) => {
                return ({
                    ...state,
                    status: "loading",
                });
            })

            .addCase(addUser.pending, (state) => {
                return (state = {
                    ...state,
                    status: "loading",
                });
            })
            .addCase(addUser.fulfilled, (state, action) => {
                return (state = {
                    ...state,
                    users: [...state.users, action.payload],
                    status: "ok",
                })
            })

            .addCase(toggleActiveUser.pending, (state) => {
                return (state = {
                    ...state,
                    status: "loading",
                });
            })
            .addCase(toggleActiveUser.fulfilled, (state, action) => {
                for (let i=0;i<state.users.length;i++) {
                    if (state.users[i].id === action.payload) state.users[i].active = !state.users[i].active;
                }
            })
    }
});

export const selectUsers = (state) => {
    return state.users.users;
}

export default usersSlice.reducer;

