import type { LucideIcon } from "lucide-react"

import useView from "@/hooks/use-view"

import useList from "../hooks/use-list"
import { cn } from "@/lib/utils"

export default function SpecialList({ id, Icon }: {
    id: string
    Icon: LucideIcon
}) {
    const { list } = useList(id)
    const { changeList , listId , changeHome} = useView()

    function handleClick() {
        changeList(id)
        changeHome(false)
    }
    return (
        <div
            onClick={handleClick}
            className={cn("flex cursor-pointer items-center gap-2 hover:bg-accent border rounded-md py-2 px-2",{
                'md:bg-accent' : list.id === listId
            })}
        >
            <Icon />
            <p className="font-semibold">{list.name}</p>
        </div>
    )
}
