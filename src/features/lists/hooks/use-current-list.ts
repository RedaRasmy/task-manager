import type { IdOfCurrent } from "@/redux/slices/current-list-task-slice"
import type { List } from "@/redux/types"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { currentListTaskActions as actions, selectCurrentListId } from "@/redux/slices/current-list-task-slice"

export default function useCurrentList() {
    const dispatch = useAppDispatch()
    const currentListId = useAppSelector(selectCurrentListId)

    function change(listId: IdOfCurrent<List>) {
        dispatch((actions.changeList(listId)))
    }

    function reset() {
        dispatch((actions.resetList()))
    }

    function resetAll() {
        dispatch((actions.resetAll()))
    }

    function resetTask() {
        dispatch(actions.resetTask())
    }

    return {
        currentListId,
        change,
        reset,
        resetAll,
        resetTask,
    }
}
