import type { LucideIcon } from "lucide-react"

import useView from "@/hooks/use-view"

import useList from "../hooks/use-list"

export default function SpecialList({ id, Icon }: {
    id: string
    Icon: LucideIcon
}) {
    const { list } = useList(id)
    const { changeList } = useView()
    return (
        <div
            onClick={() => changeList(id)}
            className="flex cursor-pointer items-center gap-2 hover:bg-accent border rounded-md py-2 px-2"
        >
            <Icon />
            <p className="font-semibold">{list.name}</p>
        </div>
    )
}
