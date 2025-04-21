import { ArrowLeft, Ellipsis } from "lucide-react"

import type { List } from "@/redux/types"

import RenamableHeading from "@/components/renamable-heading"
import useCurrentList from "@/features/lists/hooks/use-current-list"
import useList from "@/features/lists/hooks/use-list"

export default function ListHeader({ listId }: { listId: List["id"] }) {
    const { list, rename } = useList(listId)
    const { reset } = useCurrentList()

    return (
        <div className="flex justify-between items-center ">
            <div className="flex gap-3 items-center">
                <ArrowLeft color="grey" onClick={reset} className="cursor-pointer md:hidden" />
                <RenamableHeading name={list.name} rename={rename} />
            </div>
            <div className="flex items-center gap-3">
                <Ellipsis color="grey" className="cursor-pointer" />
            </div>
        </div>
    )
}
