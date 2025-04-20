import useCurrentList from "@/hooks/use-current-list"

import AddTask from "./add-task"
import ListHeader from "./list-header"
import TaskSectionContainer from "./task-section-container"
import Tasks from "./tasks"

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
