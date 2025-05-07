import { act, renderHook } from "@testing-library/react"
import { Provider } from "react-redux"
import { describe, expect, it } from "vitest"

import { store } from "@/redux/store"

import useLists from "../use-lists"

describe("useLists", () => {
    it("should render the initial states", () => {
        const { result } = renderHook(useLists , {
            wrapper : ({ children }) => <Provider store={store}>{children}</Provider>,
        })

        expect(result.current.lists.length).toBe(0)
    })
    it("should create 2 new lists -> swap -> rename one -> remove them", () => {
        const { result } = renderHook(useLists , {
            wrapper : ({ children }) => <Provider store={store}>{children}</Provider>,
        })

        // create 2 lists

        let id1 : string
        let id2 : string
        act(()=>{
            id1 = result.current.createList('myList1')
        })
        act(()=>{
            id2 = result.current.createList('myList2')
        })

        expect(result.current.lists.length).toBe(2)

        // swap them

        expect(result.current.lists[0].name).toBe('myList2')

        act(()=>result.current.swap({oldIndex:0,newIndex:1}))

        expect(result.current.lists[0].name).toBe('myList1')

        // rename one
        
        act(()=>result.current.rename(id1,"newName1"))
        
        expect(result.current.lists[0].name).toBe("newName1")

        // remove them

        act(()=>result.current.remove(id1))
        act(()=>result.current.remove(id2))
        expect(result.current.lists.length).toBe(0)

    })

})
