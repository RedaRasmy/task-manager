import type { MouseEvent } from "react"

import { List as ListIcon, Trash } from "lucide-react"

import type { List } from "@/redux/types"

import useList from "@/features/lists/hooks/use-list"
import useView from "@/hooks/use-view"

export default function List({ list }: { list: List }) {
    const { remove } = useList(list.id)
    const { changeList: change } = useView()

    function handleClick() {
        change(list.id)
    }

    function handleDelete(e: MouseEvent<SVGSVGElement>) {
        e.stopPropagation()
        remove()
    }

    return (
        <div
            data-testid="list"
            onClick={handleClick}
            className="border m-1 px-1 py-1 rounded-md items-center grid grid-cols-[40px_auto_30px] cursor-pointer"
        >
            <ListIcon />
            <p className="truncate">{list.name}</p>
            <Trash size={20} color="red" onClick={handleDelete} />
        </div>
    )
}
