import { createSelector } from "@reduxjs/toolkit"

import { selectListById } from "./slices/lists-slice"
import { selectSpecialListById } from "./slices/special-lists-slice"

export const selectAnyListById = createSelector(
    [
        (state, id) => selectListById(state, id) ?? null,
        (state, id) => selectSpecialListById(state, id) ?? null,
    ],
    (list, specialList) => list || specialList,
)
