import { describe, expect, it } from "vitest"

import listsReducer, { listsActions } from "@/redux/slices/lists-slice"

import type { List } from "../types"

// helpers
const listExample: List = { id: "listId", name: "My List", tasksIds: ['task1','task2'], ascending: true, sortMode: "manual" }
const listExample2: List = { id: "listId2", name: "My List2", tasksIds: ['task3','task4'], ascending: true, sortMode: "manual" }
const emptyState = { ids: [], entities: {} }
const stateWithList = { ids: ["listId"], entities: { listId: listExample } }
const stateWith2Lists = {ids:['listId','listId2'],entities:{listId:listExample,listId2:listExample2}}

// tests

describe("lists slice", () => {
    it("should add a new list", () => {
        const result = listsReducer(emptyState, listsActions.add(listExample))

        expect(result.ids).toContain("listId")
        expect(result.entities.listId).toEqual(listExample)
    })
    it("should remove a list", () => {
        const result = listsReducer(stateWithList, listsActions.remove(listExample.id))

        expect(result).toEqual(emptyState)
    })
    it("should update a list", () => {
        const result = listsReducer(stateWithList, listsActions.update({
            id: "listId",
            changes: {
                sortMode: "priority",
                ascending: false,
            },
        }))
        expect(result.entities.listId).toEqual({ ...listExample , ascending: false, sortMode: "priority" })
        expect(result.ids).toEqual(stateWithList.ids)
    })
    it('should swap lists' , () => {
        const result = listsReducer(stateWith2Lists, listsActions.swapLists({
            oldIndex : 0,
            newIndex : 1
        }))

        expect(result.ids[0]).toEqual('listId2')

        const result2 = listsReducer(stateWith2Lists, listsActions.swapLists({
            oldIndex : 0,
            newIndex : 0
        }))

        expect(result2).toEqual(stateWith2Lists)
    })



    it('should swap tasks ids' , () => {
        const result = listsReducer(stateWith2Lists, listsActions.swapTasks({
            listId : 'listId2',
            params : {
                oldIndex : 0 , 
                newIndex : 1
            }
        }))
        expect(result.entities.listId2.tasksIds).toEqual(['task4','task3'])
    })

    // extra reducers :

})
