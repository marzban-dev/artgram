import { appSlice } from "./slice/app.slice";
import { exploreSlice } from "./slice/explore.slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        explore: exploreSlice.reducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
