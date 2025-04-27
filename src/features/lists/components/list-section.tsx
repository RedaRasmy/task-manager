import AddTask from "@/features/tasks/components/add-task"

import TaskSectionContainer from "../../tasks/components/task-section-container"
import Tasks from "../../tasks/components/tasks"
import ListHeader from "./list-header"

export default function ListSection() {
    return (
        <div className="px-4 py-6 h-screen w-full">
            <ListHeader />
            <div className="flex flex-col gap-3 mt-5 h-full ">
                <AddTask />
                <Tasks />
                <TaskSectionContainer />
            </div>
        </div>
    )
}
