import { createSelector } from "@reduxjs/toolkit"

import type { RootState } from "./store"
import type { SortMode } from "./types"

import { selectListById } from "./slices/lists-slice"
import { selectTasksEntities } from "./slices/tasks-slice"

export const selectTasksByListId = createSelector(
    [selectListById, selectTasksEntities],
    (list, tasks) => {
        if (!list)
            return []
        return list.tasksIds.map(id => tasks[id])
    },
)

export function selectSortedTasksForList({ listId, sortMode, ascending = true }: {
    listId: string
    sortMode: SortMode
    ascending?: boolean
}) {
    return createSelector(
        [
            (state: RootState) => state.lists.entities[listId]?.tasksIds || [],
            (state: RootState) => state.tasks.entities,
        ],
        (taskIds, tasksEntities) => {
            const tasks = [...taskIds].map(id => tasksEntities[id])

            if (sortMode === "manual") {
                return tasks
                // .sort((a, b) => {
                //     if (a.completed !== b.completed) {
                //         return a.completed ? 1 : -1
                //     }
                //     return 0
                // })
            }
            else {
                return tasks
                    .sort((a, b) => {
                    // Always push completed tasks to the end
                        if (a.completed !== b.completed) {
                            return a.completed ? 1 : -1
                        }

                        const ascendingOperator = ascending ? -1 : 1
                        // const completedOperator = a['completed'] && !b['completed'] ? 1 : -1

                        // const operator =

                        if (sortMode === "name") {
                            const valA = a[sortMode]
                            const valB = b[sortMode]
                            return valA < valB ? ascendingOperator : valA > valB ? -ascendingOperator : 0
                        }
                        if (sortMode === "priority") {
                            const priorities = ["normal", "medium", "high"]
                            const valA = a[sortMode]
                            const valB = b[sortMode]
                            return priorities.indexOf(valA) < priorities.indexOf(valB)
                                ? ascendingOperator
                                : priorities.indexOf(valA) > priorities.indexOf(valB)
                                    ? -ascendingOperator
                                    : 0
                        }
                        return 0
                    })
            }
        },
    )
}

export const selectInProgressTasks = createSelector(
    [selectListById, selectTasksEntities],
    (list, tasks) => {
        if (!list)
            return []
        return list.tasksIds.map(id => tasks[id]).filter(task => !task.completed)
    },
)

export const selectCompletedTasks = createSelector(
    [selectListById, selectTasksEntities],
    (list, tasks) => {
        if (!list)
            return []
        return list.tasksIds.map(id => tasks[id]).filter(task => task.completed)
    },
)
