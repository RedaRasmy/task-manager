import type { PayloadAction } from "@reduxjs/toolkit"

import { arrayMove } from "@dnd-kit/sortable"
import { createSlice } from "@reduxjs/toolkit"

import type { RootState } from "../store"
import type { List, SwapParams, Task, TasksSwapParams, UpdatePayload } from "../types"

const initialState: List[] = []

const listsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        addList(state, { payload: list }: PayloadAction<List>) {
            state.unshift(list)
        },
        removeList(state, { payload: id }: PayloadAction<List["id"]>) {
            return state.filter(list => list.id !== id)
        },
        updateList(state, { payload }: PayloadAction<UpdatePayload<List>>) {
            return state.map((list) => {
                if (list.id === payload.id) {
                    return {
                        ...list,
                        ...payload,
                    }
                }
                else {
                    return list
                }
            })
        },
        swap(state, { payload: { oldIndex, newIndex } }: PayloadAction<SwapParams>) {
            return arrayMove(state, oldIndex, newIndex)
        },
        swapTasks(state, { payload: { listId, params: { oldIndex, newIndex } } }: PayloadAction<TasksSwapParams>) {
            return state.map((list) => {
                if (list.id === listId) {
                    return { ...list, tasks: arrayMove(list.tasks, oldIndex, newIndex) }
                }
                else {
                    return list
                }
            })
        },
        addTask(state, { payload: { listId, task } }: PayloadAction<{ listId: List["id"], task: Task }>) {
            state.forEach((list) => {
                if (list.id === listId) {
                    list.tasks.unshift(task)
                }
            })
        },

    },
})

export const listsActions = listsSlice.actions

export default listsSlice.reducer

export const listSelector = (id: List["id"]) => (state: RootState) => state.lists.find(list => list.id === id)
export const taskSelector = (id: Task["id"]) => (state: RootState) => state.lists.find(list => !!list.tasks.find(task => task.id === id))?.tasks.find(task => task.id === id)
