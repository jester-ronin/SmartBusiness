import { configureStore } from "@reduxjs/toolkit";
import apiDataReducer from "./slice"; 

const store = configureStore({
    reducer: {
        ApiDataState: apiDataReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
