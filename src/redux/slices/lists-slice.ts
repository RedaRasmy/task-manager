import type { PayloadAction } from "@reduxjs/toolkit"

import { arrayMove } from "@dnd-kit/sortable"
import { createSlice } from "@reduxjs/toolkit"

import type { RootState } from "../store"
import type { List, Task, UpdatePayload } from "../types"

const initialState: List[] = []

const listsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        addList(state, { payload: list }: PayloadAction<List>) {
            state.push(list)
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
        swap(state, { payload: { oldIndex, newIndex } }: PayloadAction<{ oldIndex: number, newIndex: number }>) {
            return arrayMove(state, oldIndex, newIndex)
            // console.log(state)
        },
    },
})

export const listsActions = listsSlice.actions

export default listsSlice.reducer

export const listSelector = (id: List["id"]) => (state: RootState) => state.lists.find(list => list.id === id)
export const taskSelector = (id: Task["id"]) => (state: RootState) => state.lists.find(list => !!list.tasks.find(task => task.id === id))?.tasks.find(task => task.id === id)
