import type { MouseEvent } from "react"

import { format } from "date-fns"
import { X } from "lucide-react"

import type { Task as TaskType } from "@/redux/types"

import useTask from "@/features/tasks/hooks/use-task"
import useView from "@/hooks/use-view"
import { cn } from "@/lib/utils"

import { Checkbox } from "../../../components/ui/checkbox"

export default function Task({ task }: { task: TaskType }) {
    const { toggle, remove } = useTask(task.id)
    const { changeTask: change } = useView()

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
            className={cn("bg-gray-100 px-4 py-2 grid grid-cols-[30px_1fr_auto] items-center my-1 rounded-md cursor-pointer", {
                "bg-yellow-300": task.priority === "high",
                "bg-blue-400": task.priority === "medium",
                "opacity-70 bg-black/50": task.completed,
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
            <div className="flex items-center gap-2">
                { task.date && <p className="text-xs text-nowrap">{format(task.date, "LLLL d")}</p>}
                <X onClick={handleRemove} />
            </div>
        </div>
    )
}
