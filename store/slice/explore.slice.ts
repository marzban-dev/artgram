import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TSearchBy = "title" | "date" | "technique" | "form" | "school" | "type" | "location";
export type TOrderBy = "asc" | "des";

interface IInitialState {
    isSearching: boolean;
    search: string | null;
    searchBy: TSearchBy;
    orderBy: TOrderBy;
}

const init: IInitialState = {
    isSearching: false,
    search: null,
    searchBy: "title",
    orderBy: "asc",
};

export const exploreSlice = createSlice({
    name: "explore",
    initialState: init,
    reducers: {
        setIsSearching(state, action: PayloadAction<boolean>) {
            state.isSearching = action.payload;
        },
        setSearch(state, action: PayloadAction<string | null>) {
            state.search = action.payload;
        },
        setSearchBy(state, action: PayloadAction<TSearchBy>) {
            state.searchBy = action.payload;
        },
        setOrderBy(state, action: PayloadAction<TOrderBy>) {
            state.orderBy = action.payload;
        },
    },
});

export const { setIsSearching, setSearchBy, setOrderBy, setSearch } = exploreSlice.actions;

export default exploreSlice.reducer;
