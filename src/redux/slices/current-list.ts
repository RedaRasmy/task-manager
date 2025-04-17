import type { PayloadAction } from "@reduxjs/toolkit"

import { createSlice } from "@reduxjs/toolkit"

import type { List } from "../types"

export type CurrentList = undefined | List["id"]

type CurrentListSlice = {
    currentList: CurrentList
}

const initialState: CurrentListSlice = {
    currentList: undefined,
}

const currentListSlice = createSlice({
    name: "currentList",
    initialState,
    reducers: {
        change(state, { payload }: PayloadAction<CurrentList>) {
            state.currentList = payload
        },
    },
})

export const currentListActions = currentListSlice.actions

export default currentListSlice.reducer
