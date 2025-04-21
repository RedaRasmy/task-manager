import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/vitest"
import { Provider } from "react-redux"
import { beforeAll, describe, expect, it } from "vitest"

import { store } from "@/redux/store"

import AddList from "../add-list"
import Lists from "../lists"

describe("addList Component", () => {
    beforeAll(() => {
        render(
            <Provider store={store}>
                <AddList />
                <Lists />
            </Provider>,
        )
    })

    it("should render add-list input", () => {
        const input = screen.getByTestId("add-list-input")
        expect(input).toBeInTheDocument()
    })

    it("should add a list and reset the input", async () => {
        const input = screen.getByTestId("add-list-input")
        const lists = screen.getByTestId("lists")
        expect(lists).toBeEmptyDOMElement()

        await userEvent.type(input, "myList{enter}")

        expect(input).toHaveValue("")

        const list = screen.getByText("myList")
        expect(list).toBeInTheDocument()
        expect(lists).not.toBeEmptyDOMElement()
    })
})
