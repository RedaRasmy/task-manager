import SwappingList from "@/components/swapping-list"
import useFullList from "@/features/lists/hooks/use-full-list"
import useView from "@/hooks/use-view"

import Task from "./task"

export default function Tasks() {
    const { listId } = useView()
    const { tasks, swap, list } = useFullList(listId)

    if (list.sortMode === "manual") {
        return (
            <SwappingList
                items={tasks}
                renderItem={task => <Task task={task} />}
                onReorder={swap}
            />
        )
    }
    else {
        return (
            <div className="overflow-y-auto mb-10 flex flex-col w-full flex-1">
                {tasks.map(task => <Task key={task.id} task={task} />)}
            </div>
        )
    }
}
