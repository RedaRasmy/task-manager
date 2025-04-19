import type { Task } from "@/redux/types"

export default function TaskHeader({ name }: { name: Task["name"] }) {
    return (
        <div className="flex items-center mb-2">
            <h1 className="capitalize font-semibold text-xl">{name}</h1>
        </div>
    )
}
