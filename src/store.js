import { configureStore } from "@reduxjs/toolkit";
import tablesSliceReducer from "./Tables/tablesSlice";
import menusSliceReducer from "./Menus/menusSlice";
import deliSliceReducer from "./Delivery/deliSlice";
import salesSliceReducer from "./Sales/salesSlice";
import usersSliceReducer from "./users/usersSlice";

export default configureStore({
    reducer: {
        tables: tablesSliceReducer,
        menus: menusSliceReducer,
        deli: deliSliceReducer,
        sales: salesSliceReducer,
        users: usersSliceReducer
    },
});