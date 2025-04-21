import type { ChangeEvent } from "react"

import type { Task } from "@/redux/types"

import useTask from "@/features/tasks/hooks/use-task"

import TaskDescription from "./task-description"
import TaskHeader from "./task-header"

export default function TaskSection({ taskId }: { taskId: Task["id"] }) {
    const { task, update } = useTask(taskId)

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        update({ description: e.target.value })
    }

    return (
        <div className="w-full px-4 py-6">
            <TaskHeader taskId={taskId} />
            <TaskDescription description={task.description} onChange={handleChange} />
        </div>
    )
}
