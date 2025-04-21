import type { MouseEvent } from "react"

import { X } from "lucide-react"

import type { Task as TaskType } from "@/redux/types"

import useCurrentTask from "@/features/tasks/hooks/use-current-task"
import useTask from "@/features/tasks/hooks/use-task"
import { cn } from "@/lib/utils"

import { Checkbox } from "../../../components/ui/checkbox"

export default function Task({ task }: { task: TaskType }) {
    const { toggle, remove } = useTask(task.id)
    const { change } = useCurrentTask()

    function handleRemove(e: MouseEvent<SVGSVGElement>) {
        e.stopPropagation()
        remove()
    }

    function handleToggle(e: MouseEvent) {
        e.stopPropagation()
        toggle()
    }

    return (
        <div
            className={cn("bg-gray-100 px-4 py-2 grid grid-cols-[30px_auto_20px] items-center my-1 rounded-md cursor-pointer", {
                "bg-yellow-300": task.priority === "high",
                "bg-blue-400": task.priority === "medium",
            })}
            onClick={() => change(task.id)}
        >
            <Checkbox
                checked={task.completed}
                onClick={handleToggle}
                className={cn("cursor-pointer border-black/30", {
                    "border-black/40": task.priority === "high",
                })}
            />
            <p className="truncate">{task.name}</p>
            <X onClick={handleRemove} />
        </div>
    )
}
