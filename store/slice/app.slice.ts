import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFullscreenArt {
    id: number;
    title: string;
    picture: string;
}

interface IInitialState {
    fullscreenArt: IFullscreenArt | null;
}

const init: IInitialState = {
    fullscreenArt: null,
};

export const appSlice = createSlice({
    name: "app",
    initialState: init,
    reducers: {
        setFullscreenArt(state, action: PayloadAction<IFullscreenArt | null>) {
            state.fullscreenArt = action.payload;
        },
    },
});

export const { setFullscreenArt } = appSlice.actions;

export default appSlice.reducer;
