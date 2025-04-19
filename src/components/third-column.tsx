import useCurrentTask from "@/hooks/use-current-task"

import TaskSection from "./task-section"

export default function ThirdColumn() {
    const { currentTaskId } = useCurrentTask()

    if (currentTaskId) {
        return <TaskSection taskId={currentTaskId} />
    }
}
