import { describe, expect, it } from "vitest"

import listsReducer, { listsActions } from "@/redux/slices/lists-slice"

import type { List } from "../types"

const listExample: List = { id: "listId", name: "My List", tasksIds: [], ascending: true, sortMode: "manual" }

describe("lists slice", () => {
    it("should add a new list", () => {
        const initialState = { ids: [], entities: {} }

        const result = listsReducer(initialState, listsActions.add(listExample))

        expect(result.ids).toContain("listId")
        expect(result.entities.listId).toEqual(listExample)
    })
    it("should remove a list", () => {
        const initialState = { ids: ["listId"], entities: {
            listId: listExample,
        } }

        const result = listsReducer(initialState, listsActions.remove(listExample.id))

        expect(result.ids).toEqual([])
        expect(result.entities).toEqual({})
    })
})
