import type { PayloadAction } from "@reduxjs/toolkit"

import { arrayMove } from "@dnd-kit/sortable"
import { createSelector, createSlice } from "@reduxjs/toolkit"

import type { RootState } from "../store"
import type { List, SwapParams, Task, UpdatePayload } from "../types"

import { listsActions } from "./lists-slice"

type TasksSlice = {
    byId: Record<Task["id"], Task>
    allIds: Task["id"][]
}

const initialState: TasksSlice = {
    byId: {},
    allIds: [],
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        swap(state, { payload: { oldIndex, newIndex } }: PayloadAction<SwapParams>) {
            state.allIds = arrayMove(state.allIds, oldIndex, newIndex)
        },
        add(state, { payload: task }: PayloadAction<Task>) {
            state.byId[task.id] = task
            state.allIds.unshift(task.id)
        },
        remove(state, { payload: id }: PayloadAction<Task["id"]>) {
            delete state.byId[id]
            state.allIds = state.allIds.filter(taskId => taskId !== id)
        },
        update(state, { payload: task }: PayloadAction<UpdatePayload<Task>>) {
            if (!state.byId[task.id])
                return
            state.byId[task.id] = Object.assign(
                {},
                state.byId[task.id],
                Object.fromEntries(Object.entries(task).filter(([_, v]) => v !== undefined)),
            )
        },
    },
    extraReducers(builder) {
        builder
            .addCase(listsActions.remove, (state, { payload: listId }) => {
                state.byId = Object.fromEntries(
                    Object.entries(state.byId).filter(([_, task]) => task.listId !== listId),
                )

                state.allIds = Object.keys(state.byId)
            })
    },
})

export const tasksActions = tasksSlice.actions

export default tasksSlice.reducer

// Selectors

const selectTasks = (state: RootState) => state.tasks

export const selectAllTasks = createSelector([selectTasks], tasks => tasks)

export const selectTaskById = createSelector(
    [selectTasks, (_, taskId: Task["id"]) => taskId],
    (tasks, taskId) => tasks.byId[taskId],
)

export const selectTasksByListId = createSelector(
    [selectTasks, (_, listId: List["id"]) => listId],
    (tasks, listId) => Object.values(tasks.byId).filter(task => task.listId === listId),
)
