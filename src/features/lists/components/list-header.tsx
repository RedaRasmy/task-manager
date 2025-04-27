import { ArrowLeft } from "lucide-react"

import RenamableHeading from "@/components/renamable-heading"
import useList from "@/features/lists/hooks/use-list"
import useView from "@/hooks/use-view"
import { specialListsIds } from "@/redux/slices/special-lists-slice"

import SortingDropdown from "./sorting-dropdown"

export default function ListHeader() {
    const { listId } = useView()
    const { list, rename, update } = useList(listId)
    const { resetHome: reset } = useView()

    return (
        <div className="flex justify-between items-center ">
            <div className="flex gap-3 items-center">
                <ArrowLeft color="grey" onClick={reset} className="cursor-pointer md:hidden" />
                <RenamableHeading
                    name={list.name}
                    rename={rename}
                    disabled={specialListsIds.includes(listId)}
                />
            </div>
            <div className="flex items-center gap-3">
                <SortingDropdown
                    sortMode={list.sortMode}
                    ascending={list.ascending}
                    onChangeSortMode={sortMode => update({ sortMode })}
                    onChangeAscending={ascending => update({ ascending })}
                />
            </div>
        </div>
    )
}
