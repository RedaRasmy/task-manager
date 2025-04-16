import { configureStore } from "@reduxjs/toolkit"

import slices from "./slices"

export const store = configureStore({
    reducer: slices,
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
