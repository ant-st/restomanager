import { configureStore } from "@reduxjs/toolkit";
import tablesSliceReducer from "./Tables/tablesSlice";
import menusSliceReducer from "./Menus/menusSlice";

export default configureStore({
    reducer: {
        tables: tablesSliceReducer,
        menus: menusSliceReducer
    },
});