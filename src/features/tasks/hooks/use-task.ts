import type { Task } from "@/redux/types"

import useView from "@/hooks/use-view"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { tasksActions as actions, selectTaskById } from "@/redux/slices/tasks-slice"

export default function useTask(taskId: Task["id"]) {
    const dispatch = useAppDispatch()
    const task = useAppSelector(state => selectTaskById(state, taskId))
    const { taskId: currentTaskId, changeTask: change } = useView()

    if (!task)
        throw new Error("Task Undefined")

    function remove() {
        if (currentTaskId === taskId) {
            change(undefined)
        }
        dispatch(actions.remove(task))
    }

    function rename(newName: Task["name"]) {
        dispatch(actions.update({ id: taskId, changes: { name: newName } }))
    }

    function toggle() {
        dispatch(actions.update({ id: taskId, changes: {
            completed: !task.completed,
            listId: task.listId,
        } }))
    }

    function update(changes: Partial<Task>) {
        dispatch(actions.update({ id: taskId, changes }))
    }

    return {
        task,
        toggle,
        remove,
        rename,
        update,
    }
}
