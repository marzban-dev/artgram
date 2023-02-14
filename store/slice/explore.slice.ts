import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    searchBy: string;
}

const init: IInitialState = {
    searchBy: "title",
};

export const exploreSlice = createSlice({
    name: "explore",
    initialState: init,
    reducers: {
        setSearchBy(state, action: PayloadAction<string>) {
            state.searchBy = action.payload;
        },
    },
});

export const { setSearchBy } = exploreSlice.actions;

export default exploreSlice.reducer;
