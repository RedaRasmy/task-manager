import { createSelector } from "@reduxjs/toolkit"

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
