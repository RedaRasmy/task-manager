import type { MouseEvent } from "react"

import { List as ListIcon, Trash } from "lucide-react"

import type { List } from "@/redux/types"

import useList from "@/features/lists/hooks/use-list"
import useView from "@/hooks/use-view"
import { cn } from "@/lib/utils"

export default function List({ list }: { list: List }) {
    const { remove } = useList(list.id)
    const { changeList: change , listId , changeHome} = useView()

    function handleClick() {
        change(list.id)
        changeHome(false)
    }

    function handleDelete(e: MouseEvent<SVGSVGElement>) {
        e.stopPropagation()
        remove()
    }

    return (
        <div
            data-testid="list"
            onClick={handleClick}
            className={cn("border m-1 px-1 py-1 rounded-md items-center grid grid-cols-[40px_auto_30px] cursor-pointer",{
                'bg-accent' : listId === list.id
            })}
        >
            <ListIcon />
            <p className="truncate">{list.name}</p>
            <Trash size={20} color="red" onClick={handleDelete} />
        </div>
    )
}
