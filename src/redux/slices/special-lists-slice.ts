// import type { PayloadAction } from "@reduxjs/toolkit"
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { isToday } from "date-fns"

import type { RootState } from "../store"
import type { List } from "../types"

import { tasksActions } from "./tasks-slice"

const adapter = createEntityAdapter({
    selectId: (list: List) => list.id,
})

const emptyState = adapter.getInitialState(
//     {
//     entities : {
//         today : {
//             id : 'today',
//             name : 'Today',
//             ascending : true,
//             sortMode : 'manual',
//             tasksIds : [] as string[]
//         },
//         scheduled : {
//             id : 'scheduled',
//             name : 'Scheduled',
//             ascending : true,
//             sortMode : 'manual',
//             tasksIds : [] as string[]
//         },
//     },
//     ids : ['today','scheduled']
// }
)

export const specialListsIds = ["today", "scheduled"]

const initialState = adapter.setAll(emptyState, [
    { id: "today", name: "Today", ascending: true, sortMode: "manual", tasksIds: [] },
    { id: "scheduled", name: "Scheduled", ascending: true, sortMode: "manual", tasksIds: [] },
])

const specialListsSlice = createSlice({
    name: "special-lists",
    initialState,
    reducers: {

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

                    if (isToday(task.date)) {
                        const todayTasksIds = state.entities.today?.tasksIds
                        if (state.entities.today) {
                            state.entities.today.tasksIds = todayTasksIds.filter(id => id !== task.id)
                        }
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
