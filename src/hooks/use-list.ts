import { v4 as uuid } from "uuid"

import type { List } from "@/redux/types"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { listsActions as actions, listSelector } from "@/redux/slices/lists-slice"

export default function useList(listId: List["id"]) {
    const dispatch = useAppDispatch()
    const list = useAppSelector(listSelector(listId))

    if (!list)
        throw new Error("List Undefined")

    function deleteList() {
        dispatch(actions.removeList(listId))
    }

    function renameList(newName: List["name"]) {
        dispatch(actions.updateList({ id: listId, name: newName }))
    }

    function createTask(name: List["name"]) {
        const id = uuid()
        dispatch(actions.addList({ id, name, tasks: [] }))
    }

    function deleteTask(id: List["id"]) {
        dispatch(actions.updateList({ id: listId, tasks: list?.tasks.filter(task => task.id !== id) }))
    }

    return {
        list,
        deleteList,
        renameList,
        createTask,
        deleteTask,
    }
}
