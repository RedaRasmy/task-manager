import type { PayloadAction } from "@reduxjs/toolkit"

import { createSlice } from "@reduxjs/toolkit"

import type { RootState } from "../store"
import type { List, Task } from "../types"

export type IdOfCurrent<T extends List | Task> = T["id"] | undefined

type CurrentListTaskSlice = {
    listId: IdOfCurrent<List>
    taskId: IdOfCurrent<Task>
}

const initialState: CurrentListTaskSlice = {
    listId: undefined,
    taskId: undefined,
}

const currentListTaskSlice = createSlice({
    name: "currentListTask",
    initialState,
    reducers: {
        changeList(state, action: PayloadAction<IdOfCurrent<List>>) {
            state.listId = action.payload
        },
        changeTask(state, action: PayloadAction<IdOfCurrent<Task>>) {
            state.taskId = action.payload
        },
        resetAll(state) {
            state.listId = undefined
            state.taskId = undefined
        },
        resetList(state) {
            state.listId = undefined
        },
        resetTask(state) {
            state.taskId = undefined
        },
    },
})

export const currentListTaskActions = currentListTaskSlice.actions

export default currentListTaskSlice.reducer

// selectors

export const selectCurrentListTaskIds = (state: RootState) => state.currentListTask

export const selectCurrentListId = (state: RootState) => state.currentListTask.listId
export const selectCurrentTaskId = (state: RootState) => state.currentListTask.taskId
