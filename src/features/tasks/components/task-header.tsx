import { ChevronsDown } from "lucide-react"

import type { Task } from "@/redux/types"

import useCurrentTask from "@/features/tasks/hooks/use-current-task"

export default function TaskHeader({ name }: { name: Task["name"] }) {
    const { reset } = useCurrentTask()
    return (
        <div className="flex items-center justify-between mb-2">
            <h1 className="capitalize font-semibold text-xl">{name}</h1>
            <ChevronsDown className="lg:hidden cursor-pointer" color="grey" onClick={reset} />
        </div>
    )
}
