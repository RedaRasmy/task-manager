import { v4 as uuid } from "uuid"

import type { ITask, List, SwapParams } from "@/redux/types"

import useCurrentTask from "@/features/tasks/hooks/use-current-task"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { listsActions, selectListById } from "@/redux/slices/lists-slice"
import { tasksActions } from "@/redux/slices/tasks-slice"
import { selectSortedTasksForList } from "@/redux/tasks-selector"

import useCurrentList from "./use-current-list"

export default function useList(listId: List["id"]) {
    const dispatch = useAppDispatch()
    const list = useAppSelector(state => selectListById(state, listId))
    const tasks = useAppSelector(selectSortedTasksForList({ listId, sortMode: list.sortMode, ascending: list.ascending }))
    const { currentListId, change } = useCurrentList()
    const { currentTaskId, change: changeTask } = useCurrentTask()

    if (!list)
        throw new Error("List Undefined")

    function remove() {
        if (currentListId === listId) {
            change(undefined)
        }
        if (currentTaskId && list.tasksIds.includes(currentTaskId)) {
            changeTask(undefined)
        }
        dispatch(listsActions.remove(listId))
    }

    function rename(newName: List["name"]) {
        dispatch(listsActions.update({ id: listId, changes: { name: newName } }))
    }

    function update(changes: Partial<List>) {
        dispatch(listsActions.update({ id: listId, changes }))
    }

    function createTask(task: ITask) {
        dispatch(tasksActions.add({
            id: uuid(),
            listId,
            completed: false,
            description: "",
            name: task.name,
            tags: [],
            priority: task.priority,
            date: task.date,
        }))
    }

    function swap(params: SwapParams) {
        dispatch(listsActions.swapTasks({ listId, params }))
    }

    // function removeAllTasks() {
    //     dispatch(listsActions.)
    // }

    return {
        list,
        tasks,
        remove,
        rename,
        createTask,
        swap,
        update,
    }
}
