import { configureStore } from "@reduxjs/toolkit";
import { asyncActionMiddleware } from "@/redux/middlewares";
import { uiSlice, todoSlice, authSlice } from "@/redux/slices";

export const store = () => {
    return configureStore({
        reducer: {
            ui: uiSlice,
            todo: todoSlice,
            auth: authSlice,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(asyncActionMiddleware),
    });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
