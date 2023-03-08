import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TSearchBy = "title" | "date" | "technique" | "form" | "school" | "type" | "location";
export type TOrderBy = "asc" | "des";

interface IInitialState {
    allowExploreLoadMore: boolean;
    isSearching: boolean;
    search: string | null;
    searchBy: TSearchBy;
    orderBy: TOrderBy;
}

const init: IInitialState = {
    allowExploreLoadMore: false,
    isSearching: false,
    search: null,
    searchBy: "title",
    orderBy: "asc",
};

export const exploreSlice = createSlice({
    name: "explore",
    initialState: init,
    reducers: {
        setAllowExploreLoadMore(state, action: PayloadAction<boolean>) {
            state.allowExploreLoadMore = action.payload;
        },
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

export const { setAllowExploreLoadMore, setIsSearching, setSearchBy, setOrderBy, setSearch } = exploreSlice.actions;

export default exploreSlice.reducer;
