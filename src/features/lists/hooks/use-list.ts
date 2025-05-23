import { v4 as uuid } from "uuid"

import type { ITask, List, SwapParams } from "@/redux/types"

import useView from "@/hooks/use-view"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectAnyListById } from "@/redux/list-selector"
import { listsActions } from "@/redux/slices/lists-slice"
import { specialListsActions, specialListsIds } from "@/redux/slices/special-lists-slice"
import { tasksActions } from "@/redux/slices/tasks-slice"

export default function useList(listId: List["id"]) {
    const dispatch = useAppDispatch()
    const list = useAppSelector(state => selectAnyListById(state, listId))
    const isSpecial = specialListsIds.includes(listId)

    const { listId: currentListId, changeList, taskId, changeTask } = useView()

    function remove() {
        if (currentListId === listId) {
            changeList("today")
        }
        if (taskId && list.tasksIds.includes(taskId)) {
            changeTask(undefined)
        }
        dispatch(listsActions.remove(listId))
    }

    function rename(newName: List["name"]) {
        dispatch(listsActions.update({ id: listId, changes: { name: newName } }))
    }

    function update(changes: Partial<List>) {
        if (isSpecial) {
            dispatch(specialListsActions.update({ id: listId, changes }))
        }
        else {
            dispatch(listsActions.update({ id: listId, changes }))
        }
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
        if (isSpecial) {
            dispatch(specialListsActions.swapTasks({ listId, params }))
        }
        else {
            dispatch(listsActions.swapTasks({ listId, params }))
        }
    }

    return {
        list,
        remove,
        rename,
        createTask,
        swap,
        update,
    }
}
