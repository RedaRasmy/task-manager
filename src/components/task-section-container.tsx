import useCurrentTask from "@/hooks/use-current-task"

import MiniTaskSection from "./mini-task-section"

export default function TaskSectionContainer() {
    const { currentTaskId } = useCurrentTask()

    if (currentTaskId) {
        return (
            <MiniTaskSection taskId={currentTaskId} />
        )
    }
}
