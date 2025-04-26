import type { LucideIcon } from "lucide-react"

export default function SpecialList({ title, Icon }: {
    title: string
    Icon: LucideIcon
}) {
    return (
        <div className="flex cursor-pointer items-center gap-2 hover:bg-accent border rounded-md py-2 px-2">
            <Icon />
            <p className="font-semibold">{title}</p>
        </div>
    )
}
