import type { PayloadAction } from "@reduxjs/toolkit"

import { arrayMove } from "@dnd-kit/sortable"
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import type { RootState } from "../store"
import type { List, SwapParams, UpdatePayload } from "../types"

const listsAdapter = createEntityAdapter({
    selectId: (list: List) => list.id,
})

// const initialState: List[] = []

const listsSlice = createSlice({
    name: "lists",
    initialState: listsAdapter.getInitialState(),
    reducers: {
        add(state, { payload: list }: PayloadAction<List>) {
            state.entities[list.id] = list
            state.ids.unshift(list.id)
        },
        remove: listsAdapter.removeOne,

        update(state, { payload: list }: PayloadAction<UpdatePayload<List>>) {
            if (!state.entities[list.id])
                return
            state.entities[list.id] = Object.assign(
                {},
                state.entities[list.id],
                Object.fromEntries(Object.entries(list).filter(([_, v]) => v !== undefined)),
            )
        },
        swap(state, { payload: { oldIndex, newIndex } }: PayloadAction<SwapParams>) {
            state.ids = arrayMove(state.ids, oldIndex, newIndex)
        },
    },
    // extraReducers(builder) {
    //     builder
    //         .addCase()
    // }
})

export const listsActions = listsSlice.actions

export default listsSlice.reducer

// Selectors

const listsSelectors = listsAdapter.getSelectors<RootState>(state => state.lists)

export const selectAllLists = listsSelectors.selectAll
export const selectListById = listsSelectors.selectById
