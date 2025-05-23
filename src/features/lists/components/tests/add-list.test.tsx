import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/vitest"
import { Provider } from "react-redux"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { store } from "@/redux/store"

import AddList from "../add-list"
import Lists from "../lists"

describe("addList Component", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <AddList />
                <Lists />
            </Provider>,
        )
    })
    afterEach(() => {
        cleanup()
    })

    it("should render add-list input", () => {
        const input = screen.getByTestId("add-list-input")
        expect(input).toBeInTheDocument()
    })

    it("should add a list and reset the input", async () => {
        const input = screen.getByTestId("add-list-input")

        await userEvent.type(input, "myList{enter}")

        expect(input).toHaveValue("")

        const list = screen.getByText("myList")
        expect(list).toBeInTheDocument()
    })
})
