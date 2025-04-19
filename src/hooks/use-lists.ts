import { v4 as uuid } from "uuid"

import type { List, SwapParams } from "@/redux/types"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { listsActions as actions, selectAllLists } from "@/redux/slices/lists-slice"

export default function useLists() {
    const dispatch = useAppDispatch()
    const lists = useAppSelector(state => selectAllLists(state))

    function createList(name: List["name"]) {
        const id = uuid()
        dispatch(actions.add({ id, name, tasksIds: [] }))
        return id
    }

    function remove(id: List["id"]) {
        dispatch(actions.remove(id))
    }

    function rename(id: List["id"], newName: List["name"]) {
        dispatch(actions.update({ id, changes: { name: newName } }))
    }

    function swap({ oldIndex, newIndex }: SwapParams) {
        dispatch(actions.swapLists({ oldIndex, newIndex }))
    }

    return {
        lists,
        createList,
        remove,
        rename,
        swap,
    }
}
