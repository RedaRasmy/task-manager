import { ChevronsDown } from "lucide-react"

import type { Priority, Task } from "@/redux/types"

import { DatePicker } from "@/components/date-picker"
import RenamableHeading from "@/components/renamable-heading"
import useView from "@/hooks/use-view"

import useTask from "../hooks/use-task"
import PriorityDropdown from "./priority-dropdown"

export default function TaskHeader({ taskId }: { taskId: Task["id"] }) {
    const { resetTask: reset } = useView()
    const { task, rename, update } = useTask(taskId)

    function handleChangePriority(newPriority: Priority) {
        update({ priority: newPriority })
    }
    function handleChangeDate(newDate: Date | undefined) {
        update({ date: newDate ? newDate.toISOString() : undefined })
    }

    return (
        <div className="flex items-center justify-between mb-2">
            <div className="flex justify-between items-center w-full pr-3">
                <RenamableHeading name={task.name} rename={rename} className="" />
                <div className="flex items-center gap-1">
                    <DatePicker
                        date={task.date ? new Date(task.date) : undefined}
                        onSelect={handleChangeDate}
                    />
                    <PriorityDropdown priority={task.priority} change={handleChangePriority} />
                </div>
            </div>
            <ChevronsDown className="lg:hidden cursor-pointer" color="grey" onClick={reset} />
        </div>
    )
}
