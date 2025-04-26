import useCurrentTask from "@/features/tasks/hooks/use-current-task"

import TaskSection from "../features/tasks/components/task-section"

export default function ThirdColumn() {
    const { currentTaskId } = useCurrentTask()

    if (currentTaskId) {
        return <TaskSection taskId={currentTaskId} />
    }

    return (
        <div className="flex justify-center items-center w-full flex-col ">
            <img alt="no-task" src="/no-task.png" className="size-[15vw] opacity-40" />
        </div>
    )
}
