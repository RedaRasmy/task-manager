import type { PayloadAction } from "@reduxjs/toolkit"

import { createSlice } from "@reduxjs/toolkit"

import type { List, UpdatePayload } from "../types"

const initialState: List[] = []

const listsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        addList(state, { payload: list }: PayloadAction<List>) {
            state.push(list)
        },
        removeList(state, { payload: id }: PayloadAction<List["id"]>) {
            state = state.filter(list => list.id !== id)
        },
        updateList(state, { payload }: PayloadAction<UpdatePayload<List>>) {
            state = state.map((list) => {
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
    },
})

export const listsActions = listsSlice.actions

export default listsSlice.reducer
