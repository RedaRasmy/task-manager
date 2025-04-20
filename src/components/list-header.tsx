import { ArrowLeft, Ellipsis } from "lucide-react"

import type { List } from "@/redux/types"

import useCurrentList from "@/hooks/use-current-list"
import useList from "@/hooks/use-list"

export default function ListHeader({ listId }: { listId: List["id"] }) {
    const { list } = useList(listId)
    const { reset } = useCurrentList()

    // function handleBack() {}

    return (
        <div className="flex justify-between items-center ">
            <div className="flex gap-3 items-center">
                <ArrowLeft color="grey" onClick={reset} className="cursor-pointer md:hidden" />
                <h1 className="font-bold text-xl capitalize md:ml-3">{list.name}</h1>
            </div>
            <div className="flex items-center gap-3">
                <Ellipsis color="grey" className="cursor-pointer" />
            </div>
        </div>
    )
}
