import type { PayloadAction } from "@reduxjs/toolkit"

import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit"
import { isPast, isToday, startOfDay } from "date-fns"

import type { RootState } from "../store"
import type { Task } from "../types"

import { listsActions } from "./lists-slice"

const tasksAdapter = createEntityAdapter({
    selectId: (task: Task) => task.id,
})

const tasksSlice = createSlice({
    name: "tasks",
    initialState: tasksAdapter.getInitialState(),
    reducers: {
        add(state, { payload: task }: PayloadAction<Task>) {
            state.entities[task.id] = task
            state.ids.unshift(task.id)
        },

        // remove : tasksAdapter.removeOne,
        removeAll: tasksAdapter.removeAll,
        remove(state, { payload: task }: PayloadAction<Task>) {
            delete state.entities[task.id]
            state.ids = state.ids.filter(taskId => taskId !== task.id)
        },
        update: tasksAdapter.updateOne,
        updateOverdueTasks : (state) => {
            const today = startOfDay(new Date())

            Object.values(state.entities).forEach((task)=>{
                if (task.date && isPast(task.date)) {
                    task.date = today.toISOString()
                }
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(listsActions.remove, (state, { payload: listId }) => {
                state.entities = Object.fromEntries(
                    Object.entries(state.entities).filter(([_, task]) => task.listId !== listId),
                )

                state.ids = Object.keys(state.entities)
            })
    },
})

export const tasksActions = tasksSlice.actions

export default tasksSlice.reducer

// Selectors

const selectTasks = (state: RootState) => state.tasks

const tasksSelectors = tasksAdapter.getSelectors(selectTasks)

// export const selectAllTasks = tasksSelectors.selectAll

export const selectTaskById = tasksSelectors.selectById
export const selectTasksEntities = tasksSelectors.selectEntities

export const selectTodaysTasks = createSelector(
    [selectTasksEntities],
    (tasks) => {
        return Object.values(tasks).filter(task => task.date && isToday(task.date))
    },
)

export const selectScheduledTasks = createSelector(
    [selectTasksEntities],
    (tasks) => {
        return Object.values(tasks).filter(task => !!task.date)
    },
)
