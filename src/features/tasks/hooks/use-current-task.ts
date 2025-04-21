import type { IdOfCurrent } from "@/redux/slices/current-list-task-slice"
import type { Task } from "@/redux/types"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { currentListTaskActions as actions, selectCurrentTaskId } from "@/redux/slices/current-list-task-slice"

export default function useCurrentTask() {
    const dispatch = useAppDispatch()
    const currentTaskId = useAppSelector(selectCurrentTaskId)

    function change(taskId: IdOfCurrent<Task>) {
        dispatch(actions.changeTask(taskId))
    }

    function reset() {
        dispatch(actions.resetTask())
    }

    return {
        currentTaskId,
        change,
        reset,
    }
}
