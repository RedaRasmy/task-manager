import useCurrentList from "@/features/lists/hooks/use-current-list"
import AddTask from "@/features/tasks/components/add-task"

import TaskSectionContainer from "../../tasks/components/task-section-container"
import Tasks from "../../tasks/components/tasks"
import ListHeader from "./list-header"

export default function ListSection() {
    const { currentListId } = useCurrentList()

    if (currentListId) {
        return (
            <div className="px-4 py-6 h-screen">
                <ListHeader listId={currentListId} />
                <div className="flex flex-col gap-3 mt-5 h-full ">
                    <AddTask listId={currentListId} />
                    <Tasks listId={currentListId} />
                    <TaskSectionContainer />
                </div>
            </div>
        )
    }
}
