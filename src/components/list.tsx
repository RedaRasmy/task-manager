import type { MouseEvent } from "react"

import { List as ListIcon, Trash } from "lucide-react"

import type { List } from "@/redux/types"

import useCurrentList from "@/hooks/use-current-list"
import useList from "@/hooks/use-list"

export default function List({ list }: { list: List }) {
    const { remove } = useList(list.id)
    const { change } = useCurrentList()

    function handleClick() {
        change(list)
    }

    function handleDelete(e: MouseEvent<SVGSVGElement>) {
        e.stopPropagation()
        remove()
    }

    return (
        <div
            onClick={handleClick}
            className="border m-1 px-1 py-1 rounded-md items-center grid grid-cols-[40px_auto_30px] cursor-pointer"
        >
            <ListIcon />
            <p className="truncate">{list.name}</p>
            <Trash size={20} color="red" onClick={handleDelete} />
        </div>
    )
}
