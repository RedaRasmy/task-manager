import type { Task } from "@/redux/types"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { tasksActions as actions, selectTaskById } from "@/redux/slices/tasks-slice"

export default function useTask(taskId: Task["id"]) {
    const dispatch = useAppDispatch()
    const task = useAppSelector(state => selectTaskById(state, taskId))

    if (!task)
        throw new Error("Task Undefined")

    function deleteTask() {
        dispatch(actions.remove(taskId))
    }

    // function rename(newName: Task["name"]) {
    //     dispatch(actions.updateList({ id: listId, name: newName }))
    // }

    function toggle() {
        dispatch(actions.update({ id: taskId, completed: !task?.completed }))
    }

    return {
        task,
        toggle,
        deleteTask,
    }
}
