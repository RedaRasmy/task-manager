import type { EntityState } from "@reduxjs/toolkit"

import { beforeEach, describe, expect, it } from "vitest"

import type { List } from "../types"

import listsReducer, { listsActions } from "../slices/lists-slice"
import tasksReducer, { tasksActions } from "../slices/tasks-slice"
import { emptyList, emptyState, stateWithTasks, task1 } from "./data"


describe("tasks slice", () => {
    let listState: EntityState<List, List["id"]>

    beforeEach(() => {
        // Create a list before each test
        listState = listsReducer(emptyState, listsActions.add(emptyList))
    })

    it("should add task then add taskId in the list.tasksIds", () => {
        const addAction = tasksActions.add(task1)

        const tasksState = tasksReducer(emptyState, addAction)
        listState = listsReducer(listState, addAction)

        expect(tasksState.entities.taskId1).toEqual(task1)
        expect(tasksState.ids).toContain('taskId1')
        expect(listState.entities.listId.tasksIds).toEqual(["taskId1"])
    })

    it("should remove a task then remove taskId from the list.tasksIds", () => {
        const removeAction = tasksActions.remove(task1)

        const tasksState = tasksReducer(stateWithTasks, removeAction)
        listState = listsReducer(listState, removeAction)

        expect(tasksState.ids.length).toEqual(1)
        expect(tasksState.entities.taskId1).toBeUndefined()
        expect(listState.entities.listId.tasksIds).toEqual([])
    })

    it("should update a task description", () => {
        const tasksState = tasksReducer(stateWithTasks, tasksActions.update({
            id: "taskId1",
            changes: {
                description: "hello",
            },
        }))
        expect(tasksState.entities.taskId1.description).toEqual("hello")
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
