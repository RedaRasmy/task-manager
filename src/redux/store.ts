import { configureStore } from "@reduxjs/toolkit"

import * as reducer from "./slices"

export const store = configureStore({
    reducer,
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
