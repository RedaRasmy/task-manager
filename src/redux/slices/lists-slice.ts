import type { PayloadAction } from "@reduxjs/toolkit"

import { arrayMove } from "@dnd-kit/sortable"
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import type { RootState } from "../store"
import type { List, SwapParams, TasksSwapParams } from "../types"

import { tasksActions } from "./tasks-slice"

const listsAdapter = createEntityAdapter({
    selectId: (list: List) => list.id,
})

const listsSlice = createSlice({
    name: "lists",
    initialState: listsAdapter.getInitialState(),
    reducers: {
        add(state, { payload: list }: PayloadAction<List>) {
            state.entities[list.id] = list
            state.ids.unshift(list.id)
        },
        remove: listsAdapter.removeOne,
        update: listsAdapter.updateOne,
        swapLists(state, { payload: { oldIndex, newIndex } }: PayloadAction<SwapParams>) {
            state.ids = arrayMove(state.ids, oldIndex, newIndex)
        },
        swapTasks(state, action: PayloadAction<TasksSwapParams>) {
            const { listId, params: { oldIndex, newIndex } } = action.payload
            const tasksIds = state.entities[listId].tasksIds
            state.entities[listId].tasksIds = arrayMove(tasksIds, oldIndex, newIndex)
        },
    },
    extraReducers(builder) {
        builder
            .addCase(tasksActions.add, (state, action) => {
                const task = action.payload
                state.entities[task.listId].tasksIds.unshift(task.id)
            })
            .addCase(tasksActions.remove, (state, action) => {
                const task = action.payload
                const tasksIds = state.entities[task.listId].tasksIds
                state.entities[task.listId].tasksIds = tasksIds.filter(id => id !== task.id)
            })
            .addCase(tasksActions.update, (state, action) => {
                const { id: taskId, changes: { completed, listId } } = action.payload

                if (completed !== undefined && listId !== undefined) {
                    const list = state.entities[listId]
                    if (!list)
                        return
                    const index = list.tasksIds.indexOf(taskId)
                    if (completed) {
                        list.tasksIds = [...list.tasksIds.slice(0, index), ...list.tasksIds.slice(index + 1), taskId]
                    }
                    else {
                        list.tasksIds = [taskId, ...list.tasksIds.slice(0, index), ...list.tasksIds.slice(index + 1)]
                    }
                }
            })
    },
})

export const listsActions = listsSlice.actions

export default listsSlice.reducer

// Selectors

export const listsSelectors = listsAdapter.getSelectors<RootState>(state => state.lists)

export const selectAllLists = listsSelectors.selectAll
export const selectListById = listsSelectors.selectById
