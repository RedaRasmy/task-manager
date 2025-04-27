import type { PayloadAction } from "@reduxjs/toolkit"

import { createSlice } from "@reduxjs/toolkit"

import type { RootState } from "../store"
import type { List, Task } from "../types"

type TaskId = Task["id"] | undefined
type ListId = List["id"]

export type ViewState = {
    listId: ListId
    taskId: TaskId
    isHome: boolean
}

const initialState: ViewState = {
    listId: "today",
    taskId: undefined,
    isHome: true,
}

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        changeList(state, action: PayloadAction<ListId>) {
            state.listId = action.payload
        },
        changeTask(state, action: PayloadAction<TaskId>) {
            state.taskId = action.payload
        },
        resetAll() {
            return initialState
        },
        resetList(state) {
            state.listId = "today"
        },
        resetTask(state) {
            state.taskId = undefined
        },
        changeHome(state, action: PayloadAction<boolean>) {
            state.isHome = action.payload
        },
        resetHome(state) {
            state.isHome = true
        },
    },
})

export const viewActions = viewSlice.actions

export default viewSlice.reducer

// selectors

export const selectView = (state: RootState) => state.view
