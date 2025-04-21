import { ChevronsDown } from "lucide-react"

import type { Task } from "@/redux/types"

import RenamableHeading from "@/components/renamable-heading"
import useCurrentTask from "@/features/tasks/hooks/use-current-task"

export default function TaskHeader({ name, rename }: { name: Task["name"], rename: (newName: string) => void }) {
    const { reset } = useCurrentTask()
    return (
        <div className="flex items-center justify-between mb-2">
            <RenamableHeading name={name} rename={rename} className="" />
            <ChevronsDown className="lg:hidden cursor-pointer" color="grey" onClick={reset} />
        </div>
    )
}
