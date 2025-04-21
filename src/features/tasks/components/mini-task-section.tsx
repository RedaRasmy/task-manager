import type { ChangeEvent } from "react"

import type { Task } from "@/redux/types"

import useTask from "@/features/tasks/hooks/use-task"

import TaskDescription from "./task-description"
import TaskHeader from "./task-header"

export default function MiniTaskSection({ taskId }: {
    taskId: Task["id"]
}) {
    const { task, update } = useTask(taskId)

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        update({ description: e.target.value })
    }

    return (
        <div
            className="lg:hidden h-[40%] border-t py-4 px-3"
        >
            <TaskHeader name={task.name} />
            <TaskDescription description={task.description} onChange={handleChange} />
        </div>
    )
}
