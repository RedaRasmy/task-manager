import { v4 as uuid } from "uuid"

import type { List } from "@/redux/types"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { listsActions as actions } from "@/redux/slices/lists-slice"

export default function useLists() {
    const dispatch = useAppDispatch()
    const lists = useAppSelector(state => state.lists)

    function createList(name: List["name"]) {
        const id = uuid()
        dispatch(actions.addList({ id, name, tasks: [] }))
        return id
    }

    function deleteList(id: List["id"]) {
        dispatch(actions.removeList(id))
    }

    function renameList(id: List["id"], newName: List["name"]) {
        dispatch(actions.updateList({ id, name: newName }))
    }

    function swap({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) {
        dispatch(actions.swap({ oldIndex, newIndex }))
    }

    return {
        lists,
        createList,
        deleteList,
        renameList,
        swap,
    }
}
