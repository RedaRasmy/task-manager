import type { MouseEvent } from "react"

import { X } from "lucide-react"

import type { Task as TaskType } from "@/redux/types"

import useCurrentTask from "@/hooks/use-current-task"
import useTask from "@/hooks/use-task"

import { Checkbox } from "./ui/checkbox"

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
            className="bg-gray-100 px-4 py-2 grid grid-cols-[30px_auto_20px] items-center my-1 rounded-md cursor-pointer"
            onClick={() => change(task.id)}
        >
            <Checkbox
                checked={task.completed}
                onClick={handleToggle}
                className="cursor-pointer"
            />
            <p className="truncate">{task.name}</p>
            <X onClick={handleRemove} />
        </div>
    )
}
