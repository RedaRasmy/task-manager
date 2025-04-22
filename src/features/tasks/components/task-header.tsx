import { ChevronsDown } from "lucide-react"

import type { Priority, Task } from "@/redux/types"

import RenamableHeading from "@/components/renamable-heading"
import useCurrentTask from "@/features/tasks/hooks/use-current-task"

import useTask from "../hooks/use-task"
import PriorityDropdown from "./priority-dropdown"

export default function TaskHeader({ taskId }: { taskId: Task["id"] }) {
    const { reset } = useCurrentTask()
    const { task, rename, update } = useTask(taskId)

    function handleChangePriority(newPriority: Priority) {
        update({ priority: newPriority })
    }
    return (
        <div className="flex items-center justify-between mb-2">
            <div className="flex justify-between items-center w-full pr-3">
                <RenamableHeading name={task.name} rename={rename} className="" />
                <PriorityDropdown priority={task.priority} change={handleChangePriority} />
            </div>
            <ChevronsDown className="lg:hidden cursor-pointer" color="grey" onClick={reset} />
        </div>
    )
}
