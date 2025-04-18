import type { Task as TaskType } from "@/redux/types"

export default function Task({ task }: { task: TaskType }) {
    return (
        <div className="bg-gray-100 px-4 py-2 flex justify-between items-center my-1 rounded-md">
            <p>{task.name}</p>
        </div>
    )
}
