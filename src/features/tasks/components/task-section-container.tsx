import useView from "@/hooks/use-view"

import MiniTaskSection from "./mini-task-section"

export default function TaskSectionContainer() {
    const { taskId } = useView()

    if (taskId) {
        return (
            <MiniTaskSection taskId={taskId} />
        )
    }
}
