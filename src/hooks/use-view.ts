import type { ViewState } from "@/redux/slices/view-slice"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { viewActions as actions, selectView } from "@/redux/slices/view-slice"

export default function useView() {
    const dispatch = useAppDispatch()
    const { taskId, listId, isHome } = useAppSelector(selectView)

    // Home

    function resetHome() {
        dispatch(actions.resetHome())
    }

    function changeHome(next: ViewState["isHome"]) {
        dispatch(actions.changeHome(next))
    }

    // list actions

    function changeList(listId: ViewState["listId"]) {
        dispatch((actions.changeList(listId)))
    }

    function resetList() {
        dispatch((actions.resetList()))
    }

    // task actions

    function changeTask(taskId: ViewState["taskId"]) {
        dispatch(actions.changeTask(taskId))
    }

    function resetTask() {
        dispatch(actions.resetTask())
    }

    // all

    function resetAll() {
        dispatch((actions.resetAll()))
    }

    return {
        listId,
        taskId,
        isHome,
        // actions
        resetHome,
        changeHome,
        resetList,
        changeList,
        resetTask,
        changeTask,
        resetAll,
    }
}
