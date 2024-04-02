import { configureStore } from "@reduxjs/toolkit";
import todoDetail from "./Todoslice";

export const store = configureStore({
    reducer: {
        app: todoDetail,
    },
});