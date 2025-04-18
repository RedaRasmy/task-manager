import { v4 as uuid } from "uuid"

import type { List, SwapParams, Task } from "@/redux/types"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { listsActions as actions, listSelector } from "@/redux/slices/lists-slice"
// import useCurrentList from "./use-current-list"

export default function useList(listId: List["id"]) {
    const dispatch = useAppDispatch()
    const list = useAppSelector(listSelector(listId))
    // const {currentList,change} = useCurrentList()

    if (!list)
        throw new Error("List Undefined")

    function deleteList() {
        // if (currentList?.id === listId) {
        //     change(undefined)
        // }
        dispatch(actions.removeList(listId))
    }

    function renameList(newName: List["name"]) {
        dispatch(actions.updateList({ id: listId, name: newName }))
    }

    function createTask(name: List["name"]) {
        const task: Task = {
            id: uuid(),
            completed: false,
            description: "",
            name,
            tags: [],
            priority: "normal",
        }
        dispatch(actions.addTask({ listId, task }))
    }

    function deleteTask(id: List["id"]) {
        dispatch(actions.updateList({ id: listId, tasks: list?.tasks.filter(task => task.id !== id) }))
    }

    function swap(params: SwapParams) {
        dispatch(actions.swapTasks({ listId, params }))
    }

    return {
        list,
        deleteList,
        renameList,
        createTask,
        deleteTask,
        swap,
    }
}
