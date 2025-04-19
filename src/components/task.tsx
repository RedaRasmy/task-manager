import { X } from "lucide-react"

import type { Task as TaskType } from "@/redux/types"

import useTask from "@/hooks/use-task"

import { Checkbox } from "./ui/checkbox"

export default function Task({ task }: { task: TaskType }) {
    const { toggle, remove } = useTask(task.id)
    return (
        <div className="bg-gray-100 px-4 py-2 grid grid-cols-[30px_auto_20px] items-center my-1 rounded-md cursor-pointer">
            <Checkbox
                checked={task.completed}
                onClick={toggle}
                className="cursor-pointer"
            />
            <p className="truncate">{task.name}</p>
            <X onClick={remove} />
        </div>
    )
}
