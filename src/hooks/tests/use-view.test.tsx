import { act, renderHook } from "@testing-library/react"
import { Provider } from "react-redux"
import { describe, expect, it } from "vitest"

import { store } from "@/redux/store"

import useView from "../use-view"

describe("useView", () => {
    it("should render the initial values", () => {
        const { result } = renderHook(useView, {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
        })

        expect(result.current.isHome).toBe(true)
        expect(result.current.listId).toBe("today")
        expect(result.current.taskId).toBe(undefined)
    })

    it("should toggle isHome then reset", () => {
        const { result } = renderHook(useView, {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
        })
        act(() => result.current.changeHome(false))
        expect(result.current.isHome).toBe(false)
        act(() => result.current.changeHome(true))
        expect(result.current.isHome).toBe(true)

        act(() => result.current.changeHome(false))
        expect(result.current.isHome).toBe(false)

        act(() => result.current.resetHome())
        expect(result.current.isHome).toBe(true)
    })
    it("should change listId then reset", () => {
        const { result } = renderHook(useView, {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
        })
        act(() => result.current.changeList("exampleId"))
        expect(result.current.listId).toBe("exampleId")

        act(() => result.current.resetList())
        expect(result.current.listId).toBe("today")
    })
    it("should change taskId then reset", () => {
        const { result } = renderHook(useView, {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
        })
        act(() => result.current.changeTask("exampleId"))
        expect(result.current.taskId).toBe("exampleId")

        act(() => result.current.resetTask())
        expect(result.current.taskId).toBe(undefined)
    })
    it("should reset all", () => {
        const { result } = renderHook(useView, {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
        })
        act(() => result.current.changeHome(false))
        act(() => result.current.changeTask("taskId"))
        act(() => result.current.changeList("listId"))

        act(() => result.current.resetAll())
        expect(result.current.isHome).toBe(true)
        expect(result.current.listId).toBe("today")
        expect(result.current.taskId).toBe(undefined)
    })
})
