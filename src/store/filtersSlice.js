import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
});

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const {
    activeFilterChanged,
} = actions;