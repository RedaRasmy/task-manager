// import type { PayloadAction } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { arrayMove } from "@dnd-kit/sortable"
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { isToday } from "date-fns"

import type { RootState } from "../store"
import type { List, TasksSwapParams } from "../types"

import { tasksActions } from "./tasks-slice"

const adapter = createEntityAdapter({
    selectId: (list: List) => list.id,
})

const emptyState = adapter.getInitialState()

export const specialListsIds = ["today", "scheduled"]

const initialState = adapter.setAll(emptyState, [
    { id: "today", name: "Today", ascending: true, sortMode: "manual", tasksIds: [] },
    { id: "scheduled", name: "Scheduled", ascending: true, sortMode: "manual", tasksIds: [] },
])

const specialListsSlice = createSlice({
    name: "special-lists",
    initialState,
    reducers: {
        swapTasks(state, action: PayloadAction<TasksSwapParams>) {
            const { listId, params: { oldIndex, newIndex } } = action.payload
            const tasksIds = state.entities[listId].tasksIds
            state.entities[listId].tasksIds = arrayMove(tasksIds, oldIndex, newIndex)
        },
        update: adapter.updateOne,
    },
    extraReducers(builder) {
        builder
            .addCase(tasksActions.add, (state, action) => {
                const task = action.payload

                if (task.date) {
                    // push to scheduled tasks
                    state.entities.scheduled.tasksIds.push(task.id)

                    if (isToday(task.date)) {
                        // push to today tasks
                        if (state.entities.today) {
                            state.entities.today.tasksIds.push(task.id)
                        }
                    }
                }
            })
            .addCase(tasksActions.remove, (state, action) => {
                const task = action.payload

                if (task.date) {
                    const tasksIds = state.entities.scheduled.tasksIds
                    state.entities.scheduled.tasksIds = tasksIds.filter(id => id !== task.id)

                    if (isToday(new Date(task.date))) {
                        const todayTasksIds = state.entities.today.tasksIds
                        if (state.entities.today) {
                            state.entities.today.tasksIds = todayTasksIds.filter(id => id !== task.id)
                        }
                    }
                }
            })
            .addCase(tasksActions.update, (state, action) => {
                const { id: taskId, changes: { completed, listId } } = action.payload
                if (!listId || !specialListsIds.includes(listId))
                    return

                if (completed !== undefined) {
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

export const specialListsActions = specialListsSlice.actions

export default specialListsSlice.reducer

const selectSpecialLists = (state: RootState) => state.specialLists

const selectors = adapter.getSelectors(selectSpecialLists)

export const selectSpecialListById = selectors.selectById
