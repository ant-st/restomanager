import { configureStore } from "@reduxjs/toolkit";
import tablesSliceReducer from "./Tables/tablesSlice";

export default configureStore({
    reducer: {
        tables: tablesSliceReducer
    },
});