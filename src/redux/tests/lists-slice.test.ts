import { describe, expect, it } from "vitest"

import listsReducer, { listsActions } from "@/redux/slices/lists-slice"

import { emptyState, list1, list2, stateWithLists } from "./data"

describe("lists slice", () => {
    it("should add a new list", () => {
        const result = listsReducer(emptyState, listsActions.add(list1))

        expect(result.ids).toContain("listId1")
        expect(result.entities.listId1).toEqual(list1)
    })
    it("should remove a list", () => {
        const result = listsReducer(stateWithLists, listsActions.remove(list1.id))
        const finalResult = listsReducer(result, listsActions.remove(list2.id))

        expect(finalResult).toEqual(emptyState)
    })
    it("should update a list", () => {
        const result = listsReducer(stateWithLists, listsActions.update({
            id: "listId1",
            changes: {
                sortMode: "priority",
                ascending: false,
            },
        }))
        expect(result.entities.listId1).toEqual({ ...list1, ascending: false, sortMode: "priority" })
        expect(result.ids).toEqual(stateWithLists.ids)
    })
    it("should swap lists", () => {
        const result = listsReducer(stateWithLists, listsActions.swapLists({
            oldIndex: 0,
            newIndex: 1,
        }))

        expect(result.ids[0]).toEqual("listId2")

        const result2 = listsReducer(stateWithLists, listsActions.swapLists({
            oldIndex: 0,
            newIndex: 0,
        }))

        expect(result2).toEqual(stateWithLists)
    })

    it("should swap tasks ids", () => {
        const result = listsReducer(stateWithLists, listsActions.swapTasks({
            listId: "listId2",
            params: {
                oldIndex: 0,
                newIndex: 1,
            },
        }))
        expect(result.entities.listId2.tasksIds).toEqual(["taskId4", "taskId3"])
    })

    // extra reducers :
})
