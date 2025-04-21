import { describe, expect, it } from "vitest"

import listsReducer, { listsActions } from "@/redux/slices/lists-slice"

describe("lists slice", () => {
    it("should add a new list", () => {
        const initialState = { ids: [], entities: {} }

        const newList = { id: "list-1", name: "My List", tasksIds: [] }

        const result = listsReducer(initialState, listsActions.add(newList))

        expect(result.ids).toContain("list-1")
        expect(result.entities["list-1"]).toEqual(newList)
    })
    it("should remove a list", () => {
        const listExample = { id: "0", name: "My List", tasksIds: [] }
        const initialState = { ids: ["0"], entities: {
            0: listExample,
        } }

        const result = listsReducer(initialState, listsActions.remove(listExample.id))

        expect(result.ids).toEqual([])
        expect(result.entities).toEqual({})
    })
})
