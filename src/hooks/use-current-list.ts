import type { CurrentList } from "@/redux/slices/current-list-slice"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { currentListActions as actions } from "@/redux/slices/current-list-slice"

export default function useCurrentList() {
    const dispatch = useAppDispatch()
    const currentList = useAppSelector(state => state.currentList.currentList)

    return {
        currentList,
        change: (nextList: CurrentList) => dispatch(actions.change(nextList)),
    }
}
