import { List as ListIcon, Trash } from "lucide-react"

import type { List } from "@/redux/types"

import useCurrentList from "@/hooks/use-current-list"
import useList from "@/hooks/use-list"

export default function List({ list }: { list: List }) {
    const { deleteList } = useList(list.id)
    const { change } = useCurrentList()

    function handleClick() {
        change(list.id)
    }
    return (
        <div
            onClick={handleClick}
            className="border m-1 px-1 py-2 rounded-md flex items-center cursor-pointer"
        >
            <ListIcon className="w-1/2 " />
            <p className="truncate w-3/2">{list.name}</p>
            {/* <div className="flex gap-5 ">
            </div> */}
            <Trash className="w-1/5" color="red" onClick={deleteList} />
        </div>
    )
}
