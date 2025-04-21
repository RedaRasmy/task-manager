import useCurrentTask from "@/features/tasks/hooks/use-current-task"

import TaskSection from "../features/tasks/components/task-section"

export default function ThirdColumn() {
    const { currentTaskId } = useCurrentTask()

    if (currentTaskId) {
        return <TaskSection taskId={currentTaskId} />
    }
}
