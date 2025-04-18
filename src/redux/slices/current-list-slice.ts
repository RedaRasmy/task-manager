import type { PayloadAction } from "@reduxjs/toolkit"

import { createSlice } from "@reduxjs/toolkit"

import type { List } from "../types"

export type CurrentList = undefined | List

type CurrentListSlice = {
    data: CurrentList
}

const initialState: CurrentListSlice = {
    data: undefined,
}

const currentListSlice = createSlice({
    name: "currentList",
    initialState,
    reducers: {
        change(state, { payload }: PayloadAction<CurrentList>) {
            state.data = payload
        },
    },
})

export const currentListActions = currentListSlice.actions

export default currentListSlice.reducer
