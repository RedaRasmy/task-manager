import type { EntityState } from "@reduxjs/toolkit"

import { beforeEach, describe, expect, it } from "vitest"

import type { List, Task } from "../types"

import listsReducer, { listsActions } from "../slices/lists-slice"
import tasksReducer, { tasksActions } from "../slices/tasks-slice"

const task: Task = {
    id: "taskId",
    completed: false,
    description: "hello world",
    listId: "listId",
    name: "task",
    priority: "normal",
    tags: [],
}
// const task2: Task = {
//     id: "taskId2",
//     completed: false,
//     description: "hello world 2",
//     listId: "listId",
//     name: "task2",
//     priority: "high",
//     tags: [],
// }

const emptyState = { ids: [], entities: {} }
const stateWithTask = { ids: ["taskId"], entities: { taskId: task } }
// const stateWithTasks = { ids: ["taskId","taskId2"], entities: { taskId: task , taskId2 : task2 } }
const list: List = { id: "listId", name: "My List", tasksIds: [], ascending: true, sortMode: "manual" }



describe("tasks slice", () => {
    let listState: EntityState<List, List["id"]>

    beforeEach(() => {
        // Create a list before each test
        listState = listsReducer(emptyState, listsActions.add(list))
    })

    it("should add task then add taskId in the list.tasksIds", () => {
        const addAction = tasksActions.add(task)

        const tasksState = tasksReducer(emptyState, addAction)
        listState = listsReducer(listState, addAction)

        expect(tasksState).toEqual(stateWithTask)
        expect(listState.entities.listId.tasksIds).toEqual(["taskId"])
    })

    it("should remove a task then remove taskId from the list.tasksIds", () => {
        const removeAction = tasksActions.remove(task)

        const tasksState = tasksReducer(stateWithTask, removeAction)
        listState = listsReducer(listState, removeAction)

        expect(tasksState).toEqual(emptyState)
        expect(listState.entities.listId.tasksIds).toEqual([])
    })

    it("should update a task description", () => {
        const tasksState = tasksReducer(stateWithTask, tasksActions.update({
            id: "taskId",
            changes: {
                description: "hello",
            },
        }))
        expect(tasksState.entities.taskId.description).toEqual("hello")
    })

    // it('should complete a task and taskId in the list.tasksIds be the last one' , () => {
    //     const completeAction = tasksActions.update({
    //         id: "taskId",
    //         changes: {
    //             completed: true,
    //         },
    //     })
    //     const tasksState = tasksReducer(stateWithTasks, completeAction )
    //     const listState = listsReducer({
    //         ids : ['listId'], entities : {
    //             listId : {
    //                 ...list, tasksIds : ['taskId','taskId2']
    //             }
    //         }
    //     }, completeAction)

    //     expect(tasksState.entities.taskId.completed).toBeTruthy()
    //     expect(listState.entities.listId.tasksIds[1]).toEqual('taskId')
    // }) 
})
