import { configureStore } from "@reduxjs/toolkit"

import * as slices from "./slices"

export const store = configureStore({
    reducer: slices,
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
