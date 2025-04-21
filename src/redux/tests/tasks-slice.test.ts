import type { EntityState } from "@reduxjs/toolkit"

import { beforeEach, describe, expect, it } from "vitest"

import type { List, Task } from "../types"

import listsReducer, { listsActions } from "../slices/lists-slice"
import tasksReducer, { tasksActions } from "../slices/tasks-slice"

const task: Task = {
    id: "taskId",
    completed: false,
    description: "",
    listId: "listId",
    name: "task0",
    priority: "normal",
    tags: [],
}

const initialState = { ids: [], entities: {} }
const initialStateWithTask = { ids: ["taskId"], entities: { taskId: task } }

describe("tasks slice", () => {
    let listState: EntityState<List, List["id"]>

    beforeEach(() => {
        // Create a list before each test
        const list = { id: "listId", name: "My List", tasksIds: [] }
        listState = listsReducer(initialState, listsActions.add(list))
    })

    it("should add task -> add taskId in the list.tasksIds", () => {
        const addAction = tasksActions.add(task)

        const tasksState = tasksReducer(initialState, addAction)
        listState = listsReducer(listState, addAction)

        expect(tasksState.ids).toEqual(["taskId"])
        expect(tasksState.entities).toEqual({ taskId: task })

        expect(listState.entities.listId.tasksIds).toEqual(["taskId"])
    })

    it("should remove a task", () => {
        const tasksState = tasksReducer(initialStateWithTask, tasksActions.remove(task))

        expect(tasksState).toEqual({ ids: [], entities: {} })
    })

    it("should update a task description", () => {
        const tasksState = tasksReducer(initialStateWithTask, tasksActions.update({
            id: "taskId",
            changes: {
                description: "hello",
            },
        }))
        expect(tasksState.entities.taskId.description).toEqual("hello")
    })
})
