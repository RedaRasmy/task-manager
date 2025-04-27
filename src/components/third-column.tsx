import useView from "@/hooks/use-view"

import TaskSection from "../features/tasks/components/task-section"

export default function ThirdColumn() {
    const { taskId } = useView()

    if (taskId) {
        return <TaskSection taskId={taskId} />
    }

    return (
        <div className="flex justify-center items-center w-full flex-col ">
            <img alt="no-task" src="/no-task.png" className="size-[15vw] opacity-40" />
        </div>
    )
}
