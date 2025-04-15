// import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export type Example = {
    value: number
}

const initialState = {
    value: 0,
}

const exampleSlice = createSlice({
    name: "example",
    initialState,
    reducers: {

    },
})

export const exmapleActions = exampleSlice.actions

export default exampleSlice.reducer
