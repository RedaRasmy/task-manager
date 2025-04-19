import { v4 as uuid } from "uuid"

import type { List, SwapParams, Task } from "@/redux/types"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { listsActions, selectListById } from "@/redux/slices/lists-slice"
import { tasksActions } from "@/redux/slices/tasks-slice"
import { selectTasksByListId } from "@/redux/tasks-selector"
// import useCurrentList from "./use-current-list"

export default function useList(listId: List["id"]) {
    const dispatch = useAppDispatch()
    const list = useAppSelector(state => selectListById(state, listId))
    const tasks = useAppSelector(state => selectTasksByListId(state, listId))
    // const {currentList,change} = useCurrentList()

    if (!list)
        throw new Error("List Undefined")

    function remove() {
        // if (currentList?.id === listId) {
        //     change(undefined)
        // }
        dispatch(listsActions.remove(listId))
    }

    function rename(newName: List["name"]) {
        dispatch(listsActions.update({ id: listId, changes: { name: newName } }))
    }

    function update(changes: Partial<List>) {
        dispatch(listsActions.update({ id: listId, changes }))
    }

    function createTask(name: Task["name"]) {
        const task: Task = {
            id: uuid(),
            listId,
            completed: false,
            description: "",
            name,
            tags: [],
            priority: "normal",
        }
        dispatch(tasksActions.add(task))
    }

    function swap(params: SwapParams) {
        dispatch(listsActions.swapTasks({ listId, params }))
    }

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
