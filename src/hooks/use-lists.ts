import { randomUUID } from "node:crypto"

import type { List } from "@/redux/types"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { listsActions as actions } from "@/redux/slices/lists"

export default function useLists() {
    const dispatch = useAppDispatch()
    const lists = useAppSelector(state => state.lists)

    function createList(name: List["name"]) {
        const id = randomUUID()
        dispatch(actions.addList({ id, name, tasks: [] }))
    }

    function deleteList(id: List["id"]) {
        dispatch(actions.removeList(id))
    }

    function renameList(id: List["id"], newName: List["name"]) {
        dispatch(actions.updateList({ id, name: newName }))
    }

    return {
        lists,
        createList,
        deleteList,
        renameList,
    }
}
